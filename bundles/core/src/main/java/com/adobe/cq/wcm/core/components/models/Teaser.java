/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
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
package com.adobe.cq.wcm.core.components.models;

import java.util.List;

import javax.annotation.Nonnull;

import org.apache.sling.api.resource.Resource;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.models.ListItem;

/**
 * Defines the {@code Teaser} Sling Model for the {@code /apps/core/wcm/components/teaser} component.
 *
 * @since com.adobe.cq.wcm.core.components.models 12.4.0
 */
public interface Teaser extends ComponentExporter {

    /**
     * Name of the resource property that defines whether or not the teaser has Call-to-Action elements
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_ACTIONS_ENABLED = "actionsEnabled";

    /**
     * Name of the child node where the Call-to-Action elements are stored
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String NN_ACTIONS = "actions";

    /**
     * Name of the resource property that stores the Call-to-Action link
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_ACTION_LINK = "link";

    /**
     * Name of the resource property that stores the Call-to-Action text
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_ACTION_TEXT = "text";

    /**
     * Name of the policy property that defines whether or not Call-to-Actions are disabled
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_ACTIONS_DISABLED = "actionsDisabled";

    /**
     * Name of the policy property that defines whether or not the image link is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_IMAGE_LINK_HIDDEN = "imageLinkHidden";

    /**
     * Name of the policy property that defines whether or not the title is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_TITLE_HIDDEN = "titleHidden";

    /**
     * Name of the policy property that defines whether or not the title link is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_TITLE_LINK_HIDDEN = "titleLinkHidden";

    /**
     * Name of the resource property that defines whether or not the title value is taken from the linked page.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_TITLE_FROM_PAGE = "titleFromPage";

    /**
     * Name of the policy property that defines whether or not the description is hidden.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_DESCRIPTION_HIDDEN = "descriptionHidden";

    /**
     * Name of the resource property that defines whether or not the description value is taken from the linked page.
     *
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_DESCRIPTION_FROM_PAGE = "descriptionFromPage";

    /**
     * Name of the policy property that stores the value for this title's HTML element type.
     *
     * @see #getTitleType()
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    String PN_TITLE_TYPE = "titleType";

    /**
     * Checks if teaser has Call-to-Action elements
     *
     * @return {@code true} if teaser has CTAs, {@code false} otherwise
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default boolean isActionsEnabled() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns the list of Call-to-Action elements
     *
     * @return the list of CTAs
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default List<ListItem> getActions() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns the URL to which this teaser links, if one was defined.
     *
     * @return the URL to which teaser links or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default String getLinkURL() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns the image resource for this teaser.
     *
     * @return the image resource for this teaser or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default Resource getImageResource() {
        throw new UnsupportedOperationException();
    }

    /**
     * Checks if link is hidden on the image.
     *
     * @return {@code true} if link is hidden on the image, {@code false} otherwise
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default boolean isImageLinkHidden() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns this teaser's title, if one was defined.
     *
     * @return the teaser's title or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default String getTitle() {
        throw new UnsupportedOperationException();
    }

    /**
     * Checks if link is hidden on the title.
     *
     * @return {@code true} if link is hidden on the title, {@code false} otherwise
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default boolean isTitleLinkHidden() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns this teaser's description, if one was defined.
     *
     * @return the teaser's description or {@code null}
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default String getDescription() {
        throw new UnsupportedOperationException();
    }

    /**
     * Returns the HTML element type (h1-h6) used for the markup.
     *
     * @return the element type
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    default String getTitleType() {
        throw new UnsupportedOperationException();
    }

    /**
     * @since com.adobe.cq.wcm.core.components.models 12.4.0
     */
    @Nonnull
    @Override
    default String getExportedType() {
        throw new UnsupportedOperationException();
    }

}
