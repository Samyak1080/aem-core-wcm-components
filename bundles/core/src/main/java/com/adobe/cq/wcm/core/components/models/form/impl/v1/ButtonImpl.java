/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2016 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
package com.adobe.cq.wcm.core.components.models.form.impl.v1;

import javax.annotation.PostConstruct;

import org.apache.commons.lang.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.wcm.core.components.commons.forms.FormsConstants;
import com.adobe.cq.wcm.core.components.models.form.Button;
import com.day.cq.i18n.I18n;

@Model(adaptables = SlingHttpServletRequest.class,
        adapters = Button.class,
        resourceType = ButtonImpl.RESOURCE_TYPE)
public class ButtonImpl implements Button {

    protected static final String RESOURCE_TYPE = FormsConstants.RT_CORE_FORM_BUTTON + "/v1/button";

    private static final String PROP_TYPE_DEFAULT = "submit";

    @ValueMapValue
    @Default(values = PROP_TYPE_DEFAULT)
    private String type;

    @ValueMapValue
    @Default(values = {})
    private String caption;

    @ValueMapValue
    @Default(values = "")
    private String name;

    @ValueMapValue
    @Default(values = "")
    private String value;

    @Self
    private SlingHttpServletRequest request;

    private I18n i18n;

    @PostConstruct
    protected void initModel() {
        i18n = new I18n(request);
    }

    @Override
    public String getType() {
        return this.type;
    }

    @Override
    public String getCaption() {
        if (this.caption == null || this.caption.trim().isEmpty()) {
            this.caption = i18n.getVar(StringUtils.capitalize(this.getType()));
        }
        return this.caption;
    }


    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getValue() {
        return value;
    }

    public static enum Type {
        SUBMIT("submit"),
        BUTTON("button");

        private String value;

        Type(String value) {
            this.value = value;
        }

        public static Type fromString(String value) {
            for (Type type : values()) {
                if (type.value.equals(value)) {
                    return type;
                }
            }
            return null;
        }
    }
}