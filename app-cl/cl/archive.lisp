(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/components/loginModal.jsx"
  (ps
    ;; imports
    (lisp-raw "import { Form } from 'remix'")
    (lisp-raw "import { Button, Modal } from 'antd'")
    (lisp-raw "import { SocialsProvider } from 'remix-auth-socials'")

    ;; page function
    (defun *social-button ()
      (psx (:*form :action (:ps (lisp-raw "`/auth/${provider}`")) :method "post"
            (:*button (:ps label)))))
    (defun *login ()
      (psx (:*modal :title "Sign In" :visible (:ps t)
            (:*social-button :provider (:ps (@ *socials-provider *github*)) :label "Sign in with Github")
            (:*social-button :provider (:ps (@ *socials-provider *google*)) :label "Sign in with Google"))))
    (lisp-raw "export default Login")))


;; new proposal modal
#+(or)
(defun *new-proposal (props)
  (const (list step set-step) (use-state 0))
  (ps::psx (:*modal :class-name "w-3/4"
            :title "New Proposal"
            :visible (:ps (@ props visible))
            :on-cancel (:ps (@ props close))
            :footer (:ps (ps::psx (:div
                                   (:*button :type "link" 
                                    :on-click (:ps (lambda () (chain props (close))))
                                    "Cancel")
                                   (:*button :type "default"
                                    :on-click (:ps (lambda () (set-step (max 0 (- step 1)))))
                                    "Back")
                                   (:*button :type "primary"
                                    :on-click (:ps (lambda () (set-step (min 2 (+ step 1)))))
                                    "Next"))))))) ; end comment
