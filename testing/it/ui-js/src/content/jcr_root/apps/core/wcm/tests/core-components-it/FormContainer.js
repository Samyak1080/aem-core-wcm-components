/*
 *  Copyright 2016 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

;(function(h, $){

    // shortcut
    var c = window.CQ.CoreComponentsIT.commons;

    // root location where form content will be stored
    var userContent = "/content/usergenerated/core-components";

    var workflowInstances = "/etc/workflow/instances/server0/" + new Date().getFullYear() + "-" +
        (new Date().getMonth()+1) + "-" + new Date().getDate();

    // some test values
    var from = "from@component.com";
    var subject = "subject line";
    var mailto1 = "mailto1@components.com";
    var mailto2 = "mailto2@components.com";
    var cc1 = "cc1@components.com";
    var cc2 = "cc2@components.com";
    var bcc1 = "bcc1@components.com";
    var bcc2 = "bcc2@components.com";

    var tcExecuteBeforeTest = new TestCase("Setup Before Test")
        // common set up
        .execTestCase(c.tcExecuteBeforeTest)

        // create the test page, store page path in 'testPagePath'
        .execFct(function (opts, done) {
            c.createPage(c.template, c.rootPage, 'page_' + Date.now(), "testPagePath", done)
        })

        // add the form container component
        .execFct(function (opts, done) {
            c.addComponent(c.rtFormContainer, h.param("testPagePath")(opts) + c.relParentCompPath, "containerPath", done)
        })

        // inside the form add an form text input field
        .execFct(function (opts, done) {
            c.addComponent(c.rtFormText, h.param("containerPath")(opts) + "/", "inputPath", done)
        })

        // set name and default value for the input field
        .execFct(function (opts, done) {
            var data = {};
            data.name = "inputname";
            data.defaultValue = "inputvalue";
            c.editNodeProperties(h.param("inputPath")(), data,done);
        })

        // add a button to the form
        .execFct(function (opts, done) {
            c.addComponent(c.rtFormButton, h.param("containerPath")(opts) + "/", "buttonPath", done)
        })

        // make sure the button is a submit button
        .execFct(function (opts, done) {
            var data = {};
            data.type = "submit";
            data.title = "Submit";
            c.editNodeProperties(h.param("buttonPath")(), data,done);
        })

        // open the page in the editor
        .navigateTo("/editor.html%testPagePath%.html");


    /**
     * After Test Case
     */
    var tcExecuteAfterTest = new TestCase("Clean up after Test")
        // common clean up
        .execTestCase(c.tcExecuteAfterTest)
        // delete any user generated content
        .execFct(function (opts,done){c.deletePage(userContent,done)})
        // delete the test page we created
        .execFct(function (opts, done) {
            c.deletePage(h.param("testPagePath")(opts), done);
        });

    /**
     * Test: Check if the action 'Store Content' works.
     */
    var storeContent = new TestCase("Test Store Content action",{
        execBefore: tcExecuteBeforeTest,
        execAfter: tcExecuteAfterTest})

        // open the edit dialog
        .execTestCase(c.tcOpenConfigureDialog("containerPath"))
        // store the content path JSON Url in  a hobbes param
        .execFct(function(opts,done){
            h.param("contentJsonUrl",h.find("input[name='./action']").val().slice(0,-1) + ".1.json");
            done();
        })
        // open action drop down
        .click(".coral-Form-field.cmp-action-type-selection.coral3-Select > button")
        // select the store action
        .click(".coral3-SelectList-item[value='foundation/components/form/actions/store']")
        // close the dialog
        .execTestCase(c.tcSaveConfigureDialog)

        //switch to the content frame
        .config.changeContext(c.getContentFrame)
        // click on the submit button
        .click("button:contains('Submit')")

        // get the json for the content node
        .execFct(function(opts,done){
            c.getJSON(h.param("contentJsonUrl")(opts),"json",done);
        })
        // check if the input value was saved
        .assert.isTrue(function(){
            // its stored in a child node with random name so we need to find it
            var data = h.param("json")();
            for (var prop in data) {
                // its the only sub object
                if (typeof data[prop] === 'object') {
                    // check the value is there
                    if (data[prop].inputname != null && data[prop].inputname == "inputvalue") {
                        return true;
                    }
                }
            }
            // not found
            return false;
        });

    /**
     * Test: set your own content path
     */
    var setContextPath = new TestCase("Set Content Path",{
        execBefore: tcExecuteBeforeTest,
        execAfter: tcExecuteAfterTest})

        // open the config dialog
        .execTestCase(c.tcOpenConfigureDialog("containerPath"))
        // open action drop down
        .click(".coral-Form-field.cmp-action-type-selection.coral3-Select > button")
        // select the store action
        .click(".coral3-SelectList-item[value='foundation/components/form/actions/store']")
        // we set our own context path
        .fillInput("input[name='./action']",userContent + "/xxx")
        // close the dialog
        .execTestCase(c.tcSaveConfigureDialog)

        //switch to the content frame
        .config.changeContext(c.getContentFrame)
        // click on the submit button
        .click("button:contains('Submit')")

        // get the json for the content node
        .execFct(function(opts,done){
            c.getJSON(userContent + "/xxx.json","json",done);
        })
        // check if the input value was saved
        .assert.isTrue(function(){
            var data = h.param("json")();
            if(data.inputname != null && data.inputname == "inputvalue") {
                return true;
            } else {
                return false;
            }
        });

    /**
     * Test: set the thank You page path
     *
     * NOTE: Timing problem. the clean up after this test is faster then the user content being stored
     * so it not cleaned up reliably. Does not hurt but its not nice.
     * Once the thank you page option is available for all actions (See https://jira.corp.adobe.com/browse/CQ-106130)
     * switch to 'Mail' action to avoid this problem.
     */
    var setThankYouPage = new TestCase("Set Thank You Page",{
        execBefore: tcExecuteBeforeTest,
        execAfter: tcExecuteAfterTest})

        // open the config dialog
        .execTestCase(c.tcOpenConfigureDialog("containerPath"))
        // open action drop down
        .click(".coral-Form-field.cmp-action-type-selection.coral3-Select > button")
        // select the store action
        .click(".coral3-SelectList-item[value='foundation/components/form/actions/store']")
        // set the thank you page
        // NOTE: We need to simulate an 'enter' at the end otherwise autocompletion will open a suggestion box
        // and take focus away, so we cant use fillInput
        .simulate("foundation-autocomplete[name='./redirect'] input[type!='hidden']",  "key-sequence"  ,
        {sequence: "/content/core-components/core-components-page{enter}"})

        // close the dialog
        .execTestCase(c.tcSaveConfigureDialog)

        //switch to the content frame
        .config.changeContext(c.getContentFrame)
        // click on the submit button
        .click("button:contains('Submit')",{expectNav:true})
        // go back to edit frame
        .config.resetContext()
        // check if the thank you page is shown
        .assert.isTrue(function() {
            return h.context().window.location.pathname.includes("core-components-page.html");
        });

    /**
     * Test: check if 'Mail' action works.
     *
     */
    var setMailAction = new TestCase("Test Mail action",{
        execBefore: tcExecuteBeforeTest,
        execAfter: tcExecuteAfterTest})

        // open the config dialog
        .execTestCase(c.tcOpenConfigureDialog("containerPath"))
        // open the action drop down (setting directly will not update dialog)
        .click(".coral-Form-field.cmp-action-type-selection.coral3-Select > button")
        // select mail action
        .click(".coral3-SelectList-item[value='foundation/components/form/actions/mail']")
        // wait for the dialog to update
        .assert.visible("[name='./from']")
        // set the 'from' field
        .fillInput("[name='./from']",from)
        // set the subject
        .fillInput("[name='./subject']",subject)

        //Fill in the Mailto
        .click(".action-type-dialog:not(.hide) >div:contains('Mailto') >coral-multifield >button")
        .fillInput("input[name='./mailto']", mailto1)
        .click(".action-type-dialog:not(.hide) >div:contains('Mailto') >coral-multifield >button")
        .fillInput("input[name='./mailto']:eq(1)", mailto2)

        //Fill in the CC
        .click(".action-type-dialog:not(.hide) >div:contains('CC'):not(:contains('BCC')) >coral-multifield >button")
        .fillInput("input[name='./cc']", cc1)
        .click(".action-type-dialog:not(.hide) >div:contains('CC'):not(:contains('BCC')) >coral-multifield >button")
        .fillInput("input[name='./cc']:eq(1)", cc2)

        //Fill in the BCC
        .click(".action-type-dialog:not(.hide) >div:contains('BCC') >coral-multifield >button")
        .fillInput("input[name='./bcc']", bcc1)
        .click(".action-type-dialog:not(.hide) >div:contains('BCC') >coral-multifield >button")
        .fillInput("input[name='./bcc']:eq(1)", bcc2)

        // save the dialog
        .execTestCase(c.tcSaveConfigureDialog)

        // workaround: request the form property, does not exist yet. This way it will only continue once its
        // written changes to the repo otherwise we are to fast
        // TODO : implement some sort of polling
        .execFct(function(opts,done){
            c.getJSON(h.param("containerPath")()+"/from.json","json",done);
        })
        // get the json for the form container
        .execFct(function(opts,done){
            c.getJSON(h.param("containerPath")()+".json","json",done);
        })

        // check if the properties are stored
        .assert.isTrue(function(){return h.param("json")().from == from})
        .assert.isTrue(function(){return h.param("json")().subject == subject})
        .assert.isTrue(function(){return h.param("json")().mailto[0] == mailto1})
        .assert.isTrue(function(){return h.param("json")().mailto[1] == mailto2})
        .assert.isTrue(function(){return h.param("json")().cc[0] == cc1})
        .assert.isTrue(function(){return h.param("json")().cc[1] == cc2})
        .assert.isTrue(function(){return h.param("json")().bcc[0] == bcc1})
        .assert.isTrue(function(){return h.param("json")().bcc[1] == bcc2});

    var startWorkflow = new TestCase("Start Workflow",{
        execBefore: tcExecuteBeforeTest,
         execAfter: tcExecuteAfterTest})
        // open the config dialog
        .execTestCase(c.tcOpenConfigureDialog("containerPath"))
        // open action drop down
        .click(".coral-Form-field.cmp-action-type-selection.coral3-Select > button")
        // select the store action
        .click(".coral3-SelectList-item[value='foundation/components/form/actions/store']")
        // we set our own context path
        .fillInput("input[name='./action']",userContent + "/workflowpayload")
        // open the drop down
        .click(".coral-Form-fieldwrapper.cmp-workflow-selection:contains('Start Workflow') .coral-Button")
        // select an workflow
        .click(".coral3-Select-overlay.is-open .coral3-SelectList-item:contains('Publish Example')")
        // close the dialog
        .execTestCase(c.tcSaveConfigureDialog)

        //switch to the content frame
        .config.changeContext(c.getContentFrame)
        // click on the submit button
        .click("button:contains('Submit')")

        // find the workflow instance that is using our payload and is in running state
        .execFct(function(opts,done) {

            var timeout = 500;
            var maxRetries = 10;
            var retries = 0;

            // the polling function
            var poll = function(){
                // request list of workflow instances (we don't know the exact path)
                $.ajax({
                    url: workflowInstances+  ".3.json",
                    method: "GET",
                    dataType: "json"
                })
                    .done(function(data){
                        for (var prop in data) {
                            // go through the instances
                            if (typeof data[prop] === 'object') {
                                // if its the one with our payload and its in Running state , success
                                if (data[prop].status == "RUNNING" &&
                                    data[prop].data.payload.path == userContent + "/workflowpayload") {

                                    // abort the workflow to avoid trouble if test reruns
                                    var props = {};
                                    props.state = "ABORTED";
                                    props._charset_ = "utf-8";
                                    c.editNodeProperties(workflowInstances + "/" + prop, props);
                                    // success
                                    done();
                                    return;
                                }
                            }
                        }

                        // check if max retries was reached
                        if (retries++ === maxRetries) {
                            done(false,"Started Workflow instance could not be found!");
                        }
                        // set for next retry
                        setTimeout(poll,timeout);

                    })
                        .fail(function(jqXHR,textStatus,errorThrown) {
                        // check if max retries was reached
                        if (retries++ === maxRetries) {
                               done(false,"Getting Workflow instances failed!: " + textStatus + "," + errorThrown);
                        }
                        // set for next retry
                        setTimeout(poll,timeout);
                    })
            };

            // start polling
            poll();
        });

    /**
     * The main test suite.
     */
    new h.TestSuite("Core-Components - Form Container",{path:"/apps/core/wcm/tests/core-components-it/FormContainer.js",
        execBefore:c.tcExecuteBeforeTestSuite,
        execInNewWindow : false})

        .addTestCase(storeContent)
        .addTestCase(setMailAction)
        .addTestCase(setContextPath)
        .addTestCase(setThankYouPage)
        .addTestCase(startWorkflow)
        // See https://jira.corp.adobe.com/browse/CQ-106130
        // TODO : write test for 'view data', its going to be moved from opening bulk editor to returning json
        // TODO : setting form identifier is going to be replaced by css styles
        // TODO : client validation not implemented yet
        // NOTE : load path is going ot be removed
    ;

}(hobs, jQuery));

