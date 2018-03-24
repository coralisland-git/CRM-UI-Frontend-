import { GAPI } from './types';
import { get_g_key } from '../env';


export const googleLogin = (dispatch) => {
    var CLIENT_ID = get_g_key();

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = [
        "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest", 
        "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
        "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ];

    var SCOPES = 'https://mail.google.com/ \
        https://www.googleapis.com/auth/gmail.modify \
        https://www.googleapis.com/auth/gmail.readonly \
        https://www.googleapis.com/auth/gmail.compose \
        https://www.googleapis.com/auth/gmail.send \
        https://www.google.com/m8/feeds/ \
        https://www.googleapis.com/auth/contacts.readonly \
        https://www.googleapis.com/auth/calendar';

    console.log("Google LOGIN ", gapi);


    var trying = false, pending = false, ret = false;

    function checkAuth() {
        if(ret) return;
        if(gapi.auth2 && gapi.auth2.getAuthInstance() && gapi.auth2.getAuthInstance().isSignedIn.get()) {
            checkAllowState();
            trying = false;
            return;
        } 

        if(!trying) {
            trying = true;
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    discoveryDocs: DISCOVERY_DOCS,
                    clientId: CLIENT_ID,
                    scope: SCOPES
                }).then(function () {
                    pending = true;
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen(checkAuth);

                    // Handle the initial sign-in state.
                    if(!gapi.auth2.getAuthInstance().isSignedIn.get()) {
                        gapi.auth2.getAuthInstance().signIn().then(() => {
                            console.log("Google Signed In");
                        }).catch(() => {
                            pending = false;
                            dispatch({
                                "type": GAPI.INIT, 
                                "status": false,
                                "message": "blocked-popup"
                            })
                            ret = true;
                            trying = false;
                            // checkAuth();
                        });
                    }
                    return; 
                }, function() {
                    console.log("Rejected");
                    return;
                });
            });
            setTimeout(()=>{
                if(!pending) {
                    trying = false;
                    console.log("Retry after 1 second ");
                }
            }, 1000);
        }

        setTimeout(() => {
            checkAuth();
        })
    }

    function checkAllowState() {
        if(gapi.auth2.getAuthInstance() && gapi.auth2.getAuthInstance().isSignedIn.get() && gapi.client.gmail && gapi.client.people) {
            dispatch({
                "type": GAPI.INIT, 
                "status": true,
                "message": null
            })
            return;
        }
        if(!trying) {
            trying = true;
            if(pending) {
                setTimeout(() => {
                    trying = false;
                }, 1000)
            } else {
                checkAuth();
                return;
            }
        }
        setTimeout(() => { 
            checkAllowState(); 
        });
    }

    checkAuth();

}
