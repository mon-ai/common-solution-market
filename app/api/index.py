from supertokens_python.recipe import thirdpartyemailpassword
from supertokens_python.recipe.thirdpartyemailpassword import Google, Github, Apple
import hy
from fastapi import FastAPI
from server import server

from supertokens_python import init, InputAppInfo, SupertokensConfig
from supertokens_python.recipe import thirdpartyemailpassword, session
from supertokens_python import get_all_cors_headers
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from supertokens_python.framework.fastapi import get_middleware


init(
    app_info=InputAppInfo(
        app_name="Common Solution Market",
        api_domain="http://localhost:3000",
        website_domain="http://localhost:3000",
        api_base_path="/api/auth",
        website_base_path="/auth"
    ),
    supertokens_config=SupertokensConfig(
        # try.supertokens.com is for demo purposes. Replace this with the
        # address of your core instance (sign up on supertokens.com), or self
        # host a core.
        connection_uri="https://try.supertokens.com",
        # api_key="IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE"
    ),
    framework='fastapi',
    recipe_list=[
        session.init(),  # initializes session features
        thirdpartyemailpassword.init(
            providers=[
                # We have provided you with development keys which you can use for testsing.
                # IMPORTANT: Please replace them with your own OAuth keys for
                # production use.
                Google(
                    client_id='1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
                    client_secret='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'
                    # ), Facebook(
                    #     client_id='FACEBOOK_CLIENT_ID',
                    #     client_secret='FACEBOOK_CLIENT_SECRET'
                ), Github(
                    client_id='467101b197249757c71f',
                    client_secret='e97051221f4b6426e8fe8d51486396703012f5bd'
                ),
                Apple(
                    client_id="4398792-io.supertokens.example.service",
                    client_key_id="7M48Y4RYDL",
                    client_private_key="-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                    client_team_id="YWQCXGJRJL"
                )
            ]
        )
    ],
    mode='asgi'  # use wsgi if you are running using gunicorn
)


# Inside init


app = server
app.add_middleware(get_middleware())

app = CORSMiddleware(
    app=app,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["Content-Type"] + get_all_cors_headers(),
)
