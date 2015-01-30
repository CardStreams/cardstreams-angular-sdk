Lifestreams Angular SDK Component
=================================

Lifestreams Angular SDK component provides set of methods and properties to store, manage and retrieve cards in an activity stream/timeline via Lifestreams Technologies Corporation's RESTful API, for use with Angular JS framework.

Prerequisites
-------------
In order to be able to use the SDK and the API, Application ID and Application Key need to be generated in the Developer Portal.

Installation
-------------
The SDK is packaged as a bower component. To install it in your project simply run
```sh
bower install ls-angular-sdk
```

and the package as a module dependency to your application, for example by including it in your index file:

```html
<script src="bower-components/ls-angular-sdk/ls-angular-sdk.js"></script>
```

Configuration
-------------
The module exposes lsAngularSDKFactory, which provides a set of methods to communicate with Lifestreams API. There are currently two ways to instantiate the SDK, depending on a usage scenario:

1. Secure implementation with access token.

```javascript
lsAngularSDKFactory.init({
  app_token: "ACCESS_TOKEN"
});
```

To get instructions on how to generate an access token, please refer to [API Documentation link](https://developer.lifestreams.com/docs#!/Lifestreams/oauthGetToken)

2. Implementation with App ID and App Key exposed.

There are times when a securely authenticated implementation is not required, for example when in an intranet or development environment. In those cases, instead of providing a token, the SDK can be initialised by passing an *app_id* and *app_key* directly to the initialisation object:

```javascript
lsAngularSDKFactory.init({
  app_id: "YOUR_3SCALE_APP_ID",
  app_key: "YOUR_3SCALE_APP_KEY"
});
```

Important thing to remember is, when in browser context, that those credentials will be exposed in the application code. It is highly recommended to not follow this approach for public facing solutions.

Additionally, initialisation method accepts the following optional parameters:

| param name | description | type
| --- | --- | --- |
| api_url | API endpoint URL, by default pointing to the latest production instance | String |
| socket_url | Socket endpoint URL, by default pointing to the latest production instance | String |

Usage
-----
Each method returns an $http promise object on success or throw an error on failure.

## getAllTimelines()
Retrieve a list of timelines available for authenticated user.

## getTimelineInfo(timelineID)
Retrieve information about a timeline.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true

## createTimeline(name, description)
Create a new timeline.

### Parameters
name | description | type | required
--- | --- | --- | ---
name | A name or title (not necessarily unique) for the timeline  | String | true
name | A description of the timeline | String | false

## updateTimeline(name, data)
Patch a timeline.

### Parameters
name | description | type | required
--- | --- | --- | ---
data | The request body can contain the following properties: *name*: A name or title (not necessarily unique) for the timeline; *description*: A description of the timeline | Object | true

## deleteTimeline(timelineID)
Delete a timeline.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true

## getCards(timelineID, count, direction, query)
Obtain cards from a given timeline.

Example:
```javascript
lsAngularSDKFactory.getCards("timelineId", 20, "around").then(function(data) {
  if (data.cards && data.cards.length > 0) {
    //do something with the data
  }
});
```

### Parameters
name | description | type | required | default
--- | --- | --- | --- | ---
timelineID | A timeline ID string | String | true | -
count | Maximum amount of cards to return as a result of the streaming call. | Number | false | 20
direction | Direction to take from the provided starting timestamp. This parameter controls whether to fetch cards from the past, from the future or around the given timestamp. | ENUM: around, before, after | false | around
query | Query string used to filter through the timeline. This allows for textual search and other filtering. | String | false | -


## createCard(timelineID, data)
Add card to a timeline.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
data | A data object containing information about a card. | Object | true

## getCard(timelineID, cardID)
Retrieve contents of a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardID | A card ID string | String | true

## updateCard(timelineID, cardId, data)
Modify contents of a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardId | A cardID string | String | true
data | A data object containing modified information about a card. | Object | true

## deleteCard(timelineId, cardId)
Delete a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardId | A cardID string | String | true

## addAttachment(timelineID, cardId, data)
Add an attachment to a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardId | A cardID string | String | true
data | A data object containing modified information about a card. | Object | true

## deleteAttachment(timelineId, cardId, attachmentId)
Delete an attachment from a given card.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardId | A cardID string | String | true
data | An attachmentID string | Object | true

## getCardComments(timelineID, cardID, data)
Retrieve comments for a given card.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardID | A card ID string | String | true
data | Attachment data | String | true

## postComment(timelineID, cardID, data)
Create a comment and attach it to a given card.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardID | A card ID string | String | true
data | A data object containing modified information about a card. | Object | true

## deleteComment(timelineID, cardID, commentID)
Delete a comment.

### Parameters
name | description | type | required
--- | --- | --- | ---
timelineID | A timeline ID string | String | true
cardID | A card ID string | String | true
commentID | A comment ID string | String | true

## getEventsToken()
Obtain a token to authenticate socket events.

