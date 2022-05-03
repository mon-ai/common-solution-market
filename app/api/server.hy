(import fastapi [FastAPI Depends])
(import fastapi.encoders [jsonable_encoder])
(import fastapi.responses [JSONResponse])
(import configs)

(import faker [Faker])
(import random [randint])

(import supertokens_python.recipe.session.framework.fastapi [verify_session])
(import supertokens_python.recipe.thirdpartyemailpassword.asyncio [get_user_by_id])
(import supertokens_python.recipe.session [SessionContainer])

(configs.init_supertokens)

(setv app (FastAPI))
(configs.add_middlewares app)

#@((app.get "/api")
   (defn/a testing-endpoint []
           ; modify as needed for tests
           "Welcome to the API"))

#@((app.post "/api/user-info")
   (defn/a user-info [^SessionContainer [session (Depends (verify_session))]]
           (do
             (setv user_id (session.get_user_id))
             (setv user_info (get_user_by_id user_id))
             (JSONResponse :content (jsonable_encoder user_id)))))

;; mock
(setv fake (Faker ["jp_JP" "en_US"]))

(defn filler-content []
  {"id" (randint 1 100)
   "title" (fake.sentence)
   "description" (fake.text)})

(defmacro filler-list [filler]
  `(lfor _ (range (randint 1 10)) ~filler))

(defn proposal []
  {"id" (randint 1 100000)
   "title" (fake.sentence)
   "description" (fake.text)
   "funding" (randint 1 100000)
   "funders" (randint 1 100)
   "issues" {"mergers" (filler-list (filler-content))
             "changes" (filler-list (filler-content))}
   "simulations" (filler-list (filler-content))})

#@((app.get "/api/mock/proposals")
   (defn/a mock-proposals []
           {"proposals" (filler-list (proposal))}))

(setv app (configs.with_cors_middlewares app))
