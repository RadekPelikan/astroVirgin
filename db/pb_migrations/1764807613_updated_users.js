/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "deleteRule": "id = @request.auth.id &&\nisDeleted = false",
    "listRule": "id = @request.auth.id &&\nisDeleted = false",
    "updateRule": "id = @request.auth.id &&\nisDeleted = false",
    "viewRule": "isDeleted = false"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update collection data
  unmarshal({
    "deleteRule": "id = @request.auth.id &&\nisDeleted = true",
    "listRule": "id = @request.auth.id &&\nisDeleted = true",
    "updateRule": "id = @request.auth.id &&\nisDeleted = true",
    "viewRule": "isDeleted = true"
  }, collection)

  return app.save(collection)
})
