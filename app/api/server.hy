(import fastapi [FastAPI])

(setv server (FastAPI))

#@( (server.get "/api")
    (defn/a welcome []
            "Welcome to the API"))
