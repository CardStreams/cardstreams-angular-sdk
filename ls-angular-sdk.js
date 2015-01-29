(function() {
  "use strict";

  var component = angular.module("ls.lsAngularSDK", []);

  component
    .factory("lsAngularSDKFactory", function($rootScope, $http, $q) {

      $rootScope.app_token = null;
      $rootScope.app_id = null;
      $rootScope.app_key = null;
      $rootScope.api_url = null;
      $rootScope.socket_url = null;

      return {
        init: function(options) {

          if (options.app_token) {
            $rootScope.app_token = options.app_token;
          } else {
            if (!options.app_id) {
              throw new Error("LS Angular SDK: app_id is not provided.");
            } else {
              $rootScope.app_id = options.app_id;
            }

            if (!options.app_key) {
              throw new Error("LS Angular SDK: app_key is not provided.");
            } else {
              $rootScope.app_key = options.app_key;
            }
          }

          $rootScope.api_url = options.api_url || "https://api.lifestreams.com/beta1";
          $rootScope.socket_url = options.socket_url || "https://api.lifestreams.com:5500";
        },

        getAllTimelines: function() {
          return $http.get($rootScope.api_url + "/timelines");
        },

        getTimelineInfo: function(timelineId) {
          return $http.get($rootScope.api_url + "/timelines/" + timelineId);
        },

        createTimeline: function(name, description) {
          var data;

          description = description || "";

          data = {
            "name": name,
            "description": description
          };

          return $http.post($rootScope.api_url + "/timelines", data);
        },

        deleteTimeline: function(timelineId) {
          return $http.delete($rootScope.api_url + "/timelines/" + timelineId);
        },

        getCards: function(timelineId, count, direction, query) {
          var endpoint = "/timelines/" + timelineId + "/cards?ts=" + Date.now();

          if (count) {
            endpoint += "&limit=" + count;
          }

          if (direction) {
            endpoint += "&direction=" + direction;
          }

          if (query) {
            endpoint += "$q=" + query
          }

          return $http.get($rootScope.api_url + endpoint);

        },

        createCard: function(timelineId, cardObj) {
          return $http.post($rootScope.api_url + "/timelines/" + timelineId + "/cards", cardObj);
        },

        getCard: function(timelineId, cardId) {
          return $http.get($rootScope.api_url + "/timelines/" + timelineId + "/cards/" + cardId);
        },

        updateCard: function(timelineId, cardId, cardObj) {
          return $http.patch($rootScope.api_url + "/timelines/" + timelineId + "/cards/"  + cardId, cardObj);
        },

        deleteCard: function(timelineId, cardId) {
          return $http.delete($rootScope.api_url + "/timelines/" + timelineId + "/cards/"  + cardId);
        },

        addAttachment: function(timelineId, cardId, attachmentObj) {
          return $http.post($rootScope.api_url + "/timelines/" + timelineId + "/cards/"  + cardId + "/attachments", attachmentObj);
        },

        deleteAttachment: function(timelineId, cardId, attachmentId) {
          return $http.delete($rootScope.api_url + "/timelines/" + timelineId + "/cards/"  + cardId + "/attachments/" + attachmentId);
        },

        getCardComments: function(timelineId, cardId) {
          return $http.get($rootScope.api_url + "/timelines/" + timelineId + "/cards/" + cardId + "/comments");
        },

        postComment: function(timelineId, cardId, commentObj) {
          return $http.post($rootScope.api_url + "/timelines/" + timelineId + "/cards/" + cardId + "/comments", commentObj);
        },

        deleteComment: function(timelineId, cardId, commentId) {
          return $http.delete($rootScope.api_url + "/timelines/" + timelineId + "/cards/" + cardId + "/comments/" + commentId);
        },

        getEventsToken: function() {
          return $http.get($rootScope.api_url + "/events")
        }

      }
    })
    .config(function($httpProvider) {
      $httpProvider.interceptors.push(function($rootScope, $q) {
        return {
          "request": function(config) {

            if ($rootScope.app_token) {
              config.headers = {
                "Authorization": "bearer " + $rootScope.app_token
              }
            } else {
              config.headers = {
                "X-Lifestreams-3scale-AppId": $rootScope.app_id,
                "X-Lifestreams-3scale-AppKey": $rootScope.app_key
              }
            }

            return config;
          },
          "responseError": function(error) {
            throw new Error(error.status + ": " + error.data);
          }
        }
      });
    });
}());