(function() {
  "use strict";

  var component = angular.module("cs.CardStreamsSDK", []);

  component
    .factory("CardStreamsSDKFactory", function($http, $q) {

      var app_token, app_id, app_key, api_url, socket_url;

      return {
        /**
         * Method that initialises the SDK setting the configuration object and sets HTTP headers
         * @param options {Object} Configuration object, which accepts following properties:
         *   app_token {String} An authentication token (required if app_id and app_key not present)
         *   app_id {String} An API ID (required if app_token not present)
         *   app_key {String} An API Key (required if app_token not present)
         *   api_url {String} API URL (optional)
         *   socket_url {String} Socket URL (optional)
         *
         * @throws {Error} When any of required config properties is not provided
         */
        init: function(options) {

          if (options.app_token) {
            app_token = options.app_token;
          } else {
            if (!options.app_id) {
              throw new Error("LS Angular SDK: app_id is not provided.");
            } else {
              app_id = options.app_id;
            }

            if (!options.app_key) {
              throw new Error("LS Angular SDK: app_key is not provided.");
            } else {
              app_key = options.app_key;
            }
          }

          api_url = options.api_url || "https://api.cardstreams.io";
          socket_url = options.socket_url || "https://api.cardstreams.io:5500";

          if (app_token) {
            $http.defaults.headers.common["Authorization"] = "bearer " + app_token
          } else {
            $http.defaults.headers.common["X-Lifestreams-3scale-AppId"] = app_id;
            $http.defaults.headers.common["X-Lifestreams-3scale-AppKey"] = app_key;
          }
        },

        getAllStreams: function() {
          return $http.get(api_url + "/streams");
        },

        getStreamInfo: function(streamId) {
          return $http.get(api_url + "/streams/" + streamId);
        },

        createStream: function(name, description) {
          var data;

          description = description || "";

          data = {
            "name": name,
            "description": description
          };

          return $http.post(api_url + "/timelines", data);
        },

        deleteStream: function(streamId) {
          return $http.delete(api_url + "/timelines/" + streamId);
        },

        updateStream: function(streamId, timelineObj) {
          return $http.patch(api_url + "/timelines/" + streamId, timelineObj);
        },

        getCards: function(streamId, count, direction, query) {
          var endpoint = "/timelines/" + streamId + "/cards?ts=" + Date.now();

          if (count) {
            endpoint += "&limit=" + count;
          }

          if (direction) {
            endpoint += "&direction=" + direction;
          }

          if (query) {
            endpoint += "$q=" + query
          }

          return $http.get(api_url + endpoint);

        },

        createCard: function(streamId, cardObj) {
          return $http.post(api_url + "/timelines/" + streamId + "/cards", cardObj);
        },

        getCard: function(streamId, cardId) {
          return $http.get(api_url + "/timelines/" + streamId + "/cards/" + cardId);
        },

        updateCard: function(streamId, cardId, cardObj) {
          return $http.patch(api_url + "/timelines/" + streamId + "/cards/"  + cardId, cardObj);
        },

        deleteCard: function(streamId, cardId) {
          return $http.delete(api_url + "/timelines/" + streamId + "/cards/"  + cardId);
        },

        addAttachment: function(streamId, cardId, attachmentObj) {
          return $http.post(api_url + "/timelines/" + streamId + "/cards/"  + cardId + "/attachments", attachmentObj);
        },

        deleteAttachment: function(streamId, cardId, attachmentId) {
          return $http.delete(api_url + "/timelines/" + streamId + "/cards/"  + cardId + "/attachments/" + attachmentId);
        },

        getCardComments: function(streamId, cardId) {
          return $http.get(api_url + "/timelines/" + streamId + "/cards/" + cardId + "/comments");
        },

        postComment: function(streamId, cardId, commentObj) {
          return $http.post(api_url + "/timelines/" + streamId + "/cards/" + cardId + "/comments", commentObj);
        },

        deleteComment: function(streamId, cardId, commentId) {
          return $http.delete(api_url + "/timelines/" + streamId + "/cards/" + cardId + "/comments/" + commentId);
        },

        getEventsToken: function() {
          return $http.get(api_url + "/events")
        }

      }
    })
    .config(function($httpProvider) {
      $httpProvider.interceptors.push(function($q) {
        return {
          "responseError": function(error) {
            throw new Error(error.status + ": " + error.data);
          }
        }
      });
    });
}());