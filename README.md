CardStreams Angular SDK Component
=================================

CardStreams Angular SDK component provides set of methods and properties to store, manage and retrieve cards in an activity stream via CardStreams RESTful API, for use with Angular JS framework.

Prerequisites
-------------
In order to be able to use the SDK and the API, Application ID and Application Key need to be generated in the [Developer Portal](https://developer.cardstreams.io).

Installation
-------------
The SDK is packaged as a bower component. To install it in your project simply run
```sh
bower install cs-angular-sdk
```

and the package as a module dependency to your application, for example by including it in your index file:

```html
<script src="bower-components/cardstreams-angular-sdk/cardstreams-angular-sdk.js"></script>
```

Configuration
-------------
The module exposes CardStreamsSDKFactory, which provides a set of methods to communicate with the CardStreams API. There are currently two ways to instantiate the SDK, depending on a usage scenario:

1. Secure implementation with access token.

```javascript
CardStreamsSDKFactory.init({
  app_token: "ACCESS_TOKEN"
});
```

To get instructions on how to generate an access token, please refer to [API Documentation link](https://developer.cardstreams.io/docs#!/Lifestreams/oauthGetToken)

2. Implementation with App ID and App Key exposed.

There are times when a securely authenticated implementation is not required, for example when in an intranet or development environment. In those cases, instead of providing a token, the SDK can be initialised by passing an *app_id* and *app_key* directly to the initialisation object:

```javascript
CardStreamsSDKFactory.init({
  app_id: "YOUR_CARDSTREAMS_ID",
  app_key: "YOUR_CARDSTREAMS_KEY"
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

## getAllStreams()
Retrieve a list of streams available for authenticated user.

## getStreamInfo(streamID)
Retrieve information about a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true

## createStream(name, description)
Create a new stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
name | A name or title (not necessarily unique) for the stream  | String | true
name | A description of the stream | String | false

## updateStream(name, data)
Patch a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
data | The request body can contain the following properties: *name*: A name or title (not necessarily unique) for the stream; *description*: A description of the stream | Object | true

## deleteStream(streamID)
Delete a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true

## getCards(streamID, count, direction, query)
Obtain cards from a given stream.

Example:
```javascript
CardStreamsSDKFactory.getCards("streamId", 20, "around").then(function(data) {
  if (data.cards && data.cards.length > 0) {
    //do something with the data
  }
});
```

### Parameters
name | description | type | required | default
--- | --- | --- | --- | ---
streamID | A stream ID string | String | true | -
count | Maximum amount of cards to return as a result of the streaming call. | Number | false | 20
direction | Direction to take from the provided starting timestamp. This parameter controls whether to fetch cards from the past, from the future or around the given timestamp. | ENUM: around, before, after | false | around
query | Query string used to filter through the stream. This allows for textual search and other filtering. | String | false | -


## createCard(streamID, data)
Add card to a stream.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
data | A data object containing information about a card. | Object | true

## getCard(streamID, cardID)
Retrieve contents of a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true

## updateCard(streamID, cardId, data)
Modify contents of a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardId | A cardID string | String | true
data | A data object containing modified information about a card. | Object | true

## deleteCard(streamId, cardId)
Delete a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardId | A cardID string | String | true

## addAttachment(streamID, cardId, data)
Add an attachment to a card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardId | A cardID string | String | true
data | A data object containing modified information about a card. | Object | true

## deleteAttachment(streamId, cardId, attachmentId)
Delete an attachment from a given card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardId | A cardID string | String | true
data | An attachmentID string | Object | true

## getCardComments(streamID, cardID, data)
Retrieve comments for a given card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
data | Attachment data | String | true

## postComment(streamID, cardID, data)
Create a comment and attach it to a given card.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
data | A data object containing modified information about a card. | Object | true

## deleteComment(streamID, cardID, commentID)
Delete a comment.

### Parameters
name | description | type | required
--- | --- | --- | ---
streamID | A stream ID string | String | true
cardID | A card ID string | String | true
commentID | A comment ID string | String | true

## getEventsToken()
Obtain a token to authenticate socket events.

