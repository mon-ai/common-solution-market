(load "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/cl/setup.lisp")
(in-package :parenscript)

(setf *ps-html-mode* :xml)

(defun sp (n)
  (format nil "~{~A~}"
          (rutils:iter (:for i :from 1 :to n)
            (:collect "&nbsp;"))))

;; WORK UNDER HERE

;;------------------------------------------------------------------------------
;; HEADER COMPONENT
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/components/header.jsx"
  (ps
    ;; imports
    ; browser
    (import-many ((dobj use-state use-effect) "react")
                 ((dobj use-navigate) "react-router-dom")
                 ((dobj use-loader-data *form *link *outlet) "@remix-run/react")
                 ((dobj use-auth) "@clerk/remix")
                 ((dobj *client-only) "remix-utils")
                 ((dobj *button *divider *input *layout *menu *space) "antd")
                 ((dobj *user-button) "@clerk/clerk-react"))
    (defconstant (dobj *header *content) *layout)
    (defconstant (dobj *search) *input)


    ;; page function
    (defun *custom-header (props)
      (ps-compat)
      ;(const (list doing-new-proposal set-doing-new-proposal) (use-state nil))
      (defconstant (dobj user-id session-id get-token) (use-auth))
      (psx
        (:*header :class-name "z-10 sticky top-0 w-screen flex items-center shadow-black"
         (:div :class-name "w-full"
          (:*menu :class-name "w-full" 
           :theme "dark" 
           :mode "horizontal"
           :default-selected-keys (:ps (if (eql (@ props variant) "proposals/list") 
                                           (list "1")
                                           []))
           :items (:ps (list
                         (create 'key "1" 'label "All")
                         (create 'key "2" 'label "My Proposals")))))
         (:*search :class-name "w-full p-1"
          :placeholder "search proposals"
          :size "middle")
         (:*client-only
          (:ps (=> ()
                   (if user-id
                       (psx
                         (:*form 
                          :method (:ps (@ props button-method))
                          :action (:ps (@ props button-link))
                          (:ps (and (@ props form-values)
                                    (chain (@ props form-values)
                                           (map
                                            (=> (value)
                                                (psx (:textarea
                                                      :hidden "hidden"
                                                      :name (:ps (elt value 0))
                                                      :value (:ps (elt value 1)))))))))
                          (:*button 
                           :type "primary"
                           :html-type "submit"
                           :size "middle"
                           :disabled (:ps (@ props button-disabled))
                           :on-click (:ps (@ props button-on-click))
                           (:ps (@ props button-text)))))
                       (psx (:a 
                             :href "https://accounts.exciting.puma-58.lcl.dev/preview/sign-up"
                             :target "_blank"
                             :rel "noreferrer"
                             (:*button 
                              :type "primary"
                              :size "middle"
                              "Sign In")))))))
         (:div :class-name "w-fit min-w-fit ml-2 flex items-end"
          (:*user-button)))))
    (export-remix *custom-header)))


;;------------------------------------------------------------------------------
;; PROPOSAL HOME
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/routes/mmon/proposals.jsx"
  (ps
    ;; imports
    ; browser
    (esm-import (dobj *outlet) "@remix-run/react")
    ; server

    ;; page function
    (defun *proposals ()
      (psx (:*outlet)))
    (export-remix *proposals)))

;;------------------------------------------------------------------------------
;; LIST PROPOSALS
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/routes/mmon/proposals/list.jsx"
  (ps
    ;; imports
    ; browser
    (import-many ((dobj use-state use-effect) "react")
                 ((dobj use-navigate) "react-router-dom")
                 ((dobj use-loader-data *form *link *outlet) "@remix-run/react")
                 ((dobj use-auth) "@clerk/remix")
                 ((dobj *layout) "antd")
                 (*header "~/components/header"))
    (defconstant (dobj *content) *layout)
    ; server
    (esm-import (dobj json) "@remix-run/node")

    ;; loader
    (async-defun loader ())

    ;; page function
    (defun *list-proposals ()
      (ps-compat)
      (defconstant (dobj user-id session-id get-token) (use-auth))
      (psx (:*layout
            (:*header 
             :variant "proposals/list" 
             :button-link "/mmon/proposals/new"
             :button-method "get"
             :button-text "New Proposal")
            (:*content :class-name "p-6"
             (:*outlet)))))
    (export-remix *list-proposals :l)))

;;------------------------------------------------------------------------------
;; NEW PROPOSAL
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/routes/mmon/proposals/new.jsx"
  (ps 
    ;; imports
    ; browser
    (import-many ((dobj use-state use-effect use-callback) "react")
                 ((dobj use-location use-navigate) "react-router-dom")
                 ((dobj use-loader-data use-submit *form *link *outlet) "@remix-run/react")
                 ((dobj *client-only) "remix-utils")
                 ((dobj *button *card *divider *layout *page-header *space *steps) "antd")
                 (*header "~/components/header"))
    (defconstant (dobj *content) *layout)
    (defconstant (dobj *step) *steps)
    ; server
    (import-many ((dobj json redirect) "@remix-run/node")
                 ((dobj get-auth) "@clerk/remix/ssr.server")
                 ((dobj redis) "~/services/clients.server"))

    ;; subpage selector
    (defun page-link (step)
      (case step
        (0 "/mmon/proposals/new/propose")
        (1 "/mmon/proposals/new/elaborate")
        (2 "/mmon/proposals/new/fund")
        ; stripe integration here
        (3 "/mmon/proposals/new/commit")
        (otherwise "/mmon/proposals/list")))


    (defun button-text (step funding)
      (case step
        (0 "Propose")
        (1 "Elaborate")
        (2 "Fund")
        (3 (+ "Commit $" funding))
        (otherwise "Back")))

    (defconstant route-to-step
                 (create
                   "/mmon/proposals/new/propose" 0
                   "/mmon/proposals/new/elaborate" 1
                   "/mmon/proposals/new/fund" 2))

    ;; cached data
    (defloader
      (defconstant (dobj user-id) (await (get-auth request)))
      (chain 
        *promise
        (all
          (list
            (redis.get (+ "autosave-proposal:name:" user-id))
            (redis.get (+ "autosave-proposal:description:" user-id))
            (redis.get (+ "autosave-proposal:funding:" user-id))))
        (then (=> (values)
                  (json (create 'cached-name (elt values 0)
                                'cached-description (elt values 1)
                                'cached-funding (elt values 2)))))))

    ;; reset
    (defaction
      (defconstant (dobj user-id) (await (get-auth request)))
      (redis.del (+ "autosave-proposal:name:" user-id)
                 (+ "autosave-proposal:description:" user-id)
                 (+ "autosave-proposal:funding:" user-id))
      (redirect "/mmon/proposals/new/propose"))

    ;; page function
    (defun *new-proposal ()
      (ps-compat)
      (defconstant data (use-loader-data))
      (defconstant location (use-location))
      (defconstant navigate (use-navigate))
      (defconstant submit (use-submit))
      (defconstant (list step set-step) (use-state 0))
      ; TODO possibly move these to child components
      (defconstant (list name set-name) (use-state ""))
      (defconstant (list description set-description) (use-state (raw (format nil "'## Description\\n\\n\\n\\n## Context\\n\\n\\n\\n## Criteria\\n\\n'"))))
      (defconstant (list funding set-funding) (use-state 100))
      (defconstant (list next-disabled set-next-disabled) (use-state t))
      (defun restart ()
        (set-name "")
        (set-description (raw (format nil "'## Description\\n\\n\\n\\n## Context\\n\\n\\n\\n## Criteria\\n\\n'")))
        (set-funding 100)
        (set-next-disabled t))
      (defun data-of (step)
        (case step
          (0 (list (list "name" name)))
          (1 (list (list "description" description)))
          (2 (list (list "amount" funding) (list "description" name)))))
      (use-effect (=> ()
                      (when (@ data cached-funding)
                        (set-funding (@ data cached-funding)))
                      (when (@ data cached-description)
                        (set-description (@ data cached-description)))
                      (when (@ data cached-name)
                        (set-name (@ data cached-name)))
                      undefined) [])
      (use-effect (=> ()
                      (set-step (@ route-to-step (@ location pathname))))
                  (list location))
      (use-effect (=> ()
                      (set-next-disabled
                        (case step
                          (0 (= (length name) 0))
                          (1 (= (length description) 0))
                          (2 (= funding 0)))))
                  (list step name description funding))
      (psx
        (:*layout
          (:*header :variant "proposals/new"
                    :button-text (:ps (button-text (+ step 1) funding))
                    :button-disabled (:ps next-disabled)
                    :form-values (:ps (data-of step))
                    :button-method "post"
                    :button-link (:ps (page-link step)))
          (:*content :class-name "p-6"
                     (:*space :class-name "w-full" :direction "vertical"
                              (:*page-header :class-name "shadow-ant-light"
                                             :ghost (:ps false)
                                             :on-back (:ps (=> () (navigate -1) nil))
                                             :title "New Proposal"
                                             :extra (:ps (list
                                                           (psx (:*form :method "post" :action "/mmon/proposals/new"
                                                                        :key "3"
                                                                        (:*button 
                                                                          :key "3" 
                                                                          :type "link" 
                                                                          :html-type "submit"
                                                                          :on-click (:ps restart)
                                                                          "Restart")))
                                                           (psx (:*link :to (:ps (page-link (- step 1)))
                                                                        :key "2"
                                                                        (:*button
                                                                          :key "2" 
                                                                          :type "default"
                                                                          :disabled (:ps (= step 0))
                                                                          (:ps (button-text (- step 1) funding)))))
                                                           (psx (:*form :method "post" :action (:ps (page-link step))
                                                                        :key "1"
                                                                        (:ps
                                                                          (chain (data-of step)
                                                                                 (map
                                                                                   (=> (value)
                                                                                       (psx (:textarea
                                                                                              :hidden "hidden"
                                                                                              :name (:ps (elt value 0))
                                                                                              :value (:ps (elt value 1))))))))
                                                                        (:*button 
                                                                          :key "1" 
                                                                          :type "primary" 
                                                                          :html-type "submit"
                                                                          :disabled (:ps next-disabled)
                                                                          (:ps (button-text (+ step 1) funding)))))))
                                             (:*steps :current (:ps step)
                                                      (:*step :title "Propose" :description "problem to solve")
                                                      (:*step :title "Elaborate" :description "context and criteria")
                                                      (:*step :title "Fund" :description "your new proposal")))
                              (:*outlet :context (:ps (dobj name set-name 
                                                            description set-description 
                                                            funding set-funding
                                                            next-disabled))))))))
    (export-remix *new-proposal :la)))

;;------------------------------------------------------------------------------
;; PROPOSE
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/routes/mmon/proposals/new/propose.jsx"
  (ps
    ;client
    (import-many ((dobj use-state use-effect) "react")
                 ((dobj use-navigate) "react-router-dom")
                 ((dobj use-loader-data use-outlet-context *form *link) "@remix-run/react")
                 ((dobj *client-only) "remix-utils")
                 ((dobj *button *card *divider *input *space) "antd"))
    ; server
    (import-many ((dobj json redirect) "@remix-run/node")
                 ((dobj get-auth) "@clerk/remix/ssr.server")
                 ((dobj stripe redis) "~/services/clients.server"))

    ; loader
    #+(or)
    (defloader
      (defconstant (dobj user-id) (await (get-auth request)))
      (defconstant cached-name (await (redis.get (+ "autosave-proposal:name:" user-id))))
      (json (create 'cached-name cached-name)))

    ; action
    (defaction
      (defconstant (dobj user-id) (await (get-auth request)))
      (defconstant reply (await (redis.set (+ "autosave-proposal:name:" user-id) 
                                       (body.get "name")))) 
      (if (eq reply "OK") (redirect "/mmon/proposals/new/elaborate")))


    ;; search existing proposals, then create new proposal if not found
    (defun *propose-form (props)
      (ps-compat)
      (defconstant (dobj name set-name next-disabled) (use-outlet-context))
      ;(defconstant data (use-loader-data))
      #+(or)
      (use-effect (=> () (when (@ data cached-name) (set-name (@ data cached-name))) 
                      undefined) [])
      (psx (:*card :class-name "w-full h-auto min-h-[50vh] shadow-ant-light"
            (:*form :method "post"
             (:*space :class-name "w-full" :direction "vertical"
              (:*input
               :name "name"
               :value (:ps name)
               :on-change (:ps (=> (e) (set-name (@ e target value) nil)))
               :placeholder "What would you like to solve?")
              (:*button 
               :type "primary"
               :html-type "submit"
               :disabled (:ps  next-disabled)
               "Confirm and Elaborate"))))))
    (export-remix *propose-form :a)))

;;------------------------------------------------------------------------------
;; ELABORATE
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/routes/mmon/proposals/new/elaborate.jsx"
  (ps
    ; client
    (import-many ((dobj use-state use-effect) "react")
                 ((dobj use-navigate) "react-router-dom")
                 ((dobj use-loader-data use-outlet-context *form *link) "@remix-run/react")
                 ((dobj *client-only) "remix-utils")
                 ((dobj *button *card *divider *layout *page-header *space *steps) "antd")
                 ((dobj *remark ) "react-remark")
                 (*code-mirror "~/components/codemirror.client"))
    ; server
    (import-many ((dobj json redirect) "@remix-run/node")
                 ((dobj get-auth) "@clerk/remix/ssr.server")
                 ((dobj stripe redis) "~/services/clients.server"))

    ; loader
    #+(or)
    (defloader
      (defconstant (dobj user-id) (await (get-auth request)))
      (defconstant cached-description
        (await (redis.get (+ "autosave-proposal:description:" user-id))))
      (json (create 'cached-description cached-description)))

    ; action
    (defaction
      (defconstant (dobj user-id) (await (get-auth request)))
      (defconstant reply (await (redis.set (+ "autosave-proposal:description:" user-id) 
                                       (body.get "description")))) 
      (if (eq reply "OK") (redirect "/mmon/proposals/new/fund")))


    ;; markdown editor for description
    (defun *elaborate-form (props)
      (ps-compat)
      (defconstant (dobj description set-description next-disabled) (use-outlet-context))
      ; TODO not sure whether to keep state in here, and cache with Redis
      ;(defconstant (list description set-description) (use-state (raw (format nil "'## Description\\n\\n\\n\\n## Context\\n\\n\\n\\n## Criteria\\n\\n'"))))
      ;(defconstant data (use-loader-data))
      #+(or)
      (use-effect (=> () (when (@ data cached-description) 
                           (set-description (@ data cached-description)))
                      undefined) [])
      (psx 
        (:*card :class-name "w-full h-auto min-h-[50vh] break-words shadow-ant-light"
         (:*card.-grid :class-name "w-1/2 min-h-[50vh]"
          (:*client-only (:ps (=> () (psx (:*code-mirror 
                                           :value (:ps description)
                                           :options (:ps (create 'mode "markdown"
                                                                 'line-wrapping t
                                                                 'viewport-margin *infinity))
                                           :on-before-change (:ps (=> (editor data value)
                                                                      (set-description value) 
                                                                      nil))))))))
         ;(:*divider :orientation "left" :plain (:js t) "Preview")
         (:*card.-grid :class-name "w-1/2" ;:hoverable (:js false)
          (:*remark (:ps description)))
         (:*form :method  "post"
          (:input :type "hidden" :name "description" :value (:ps description))
          (:*button :class-name "m-3" 
           :type "primary"
           :html-type "submit"
           :disabled (:ps next-disabled)
           "Confirm and Fund")))))
    (export-remix *elaborate-form :a)))

;;------------------------------------------------------------------------------
;; FUND
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/routes/mmon/proposals/new/fund.jsx"
  (ps
    ; client
    (import-many ((dobj use-state use-effect) "react")
                 ((dobj use-navigate) "react-router-dom")
                 ((dobj use-loader-data use-outlet-context *form *link) "@remix-run/react")
                 ((dobj *client-only) "remix-utils")
                 ((dobj *button *card *divider *input-number *space) "antd"))
    ; server
    (import-many ((dobj json redirect) "@remix-run/node")
                 ((dobj get-auth) "@clerk/remix/ssr.server")
                 ((dobj (as query q)) "faunadb")
                 ((dobj fauna redis snowflake stripe) "~/services/clients.server"))

    ; loader
    #+(or)
    (defloader
      (defconstant (dobj user-id) (await (get-auth request)))
      (defconstant cached-funding (await (redis.get (+ "autosave-proposal:funding:" user-id))))
      (defconstant cached-name (await (redis.get (+ "autosave-proposal:name:" user-id))))
      (json (create 'cached-funding cached-funding
                    'cached-name cached-name)))

    ; action
    (defaction 
      (defconstant (dobj user-id) (await (get-auth request)))
      (defconstant proposal-id (chain snowflake (get-unique-i-d)))
      (chain 
        *promise 
        (all (list
               (redis.set (+ "autosave-proposal:funding:" user-id) 
                          (body.get "amount"))
               (fauna.query
                 (q.-create (q.-ref (q.-collection "proposals") (chain proposal-id (to-string)))
                            (create 'data (create 'name (body.get "name")
                                                  'proposer (chain user-id (to-string))
                                                  'description (body.get "description")
                                                  'funding 0
                                                  'patrons []))))
               (stripe.checkout.sessions.create 
                 (create
                   'line_items
                   (list (create
                           'price_data (create
                                         'currency "usd"
                                         'unit_amount (* 100 (body.get "amount"))
                                         'product_data (create
                                                         'name "Initial Funding"
                                                         'description (body.get "name")))
                           'quantity 1))
                   'mode "payment"
                   'payment_intent_data (create 'metadata (create 'proposal-id proposal-id))
                   ; TODO add real success page
                   'success_url "http://localhost:3000/mmon/proposals/list"
                   'cancel_url "http://localhost:3000/mmon/proposals/new/fund"))))
        (then (=> (values)
                  ; third promise is stripe checkout session
                  (redirect (@ (elt values 2) url))))))

    ;; choose how much to fund initially, then pay with Stripe
    (defun *fund-form (props)
      (ps-compat)
      (defconstant (dobj name description funding set-funding next-disabled) 
                   (use-outlet-context))
      ;(defconstant data (use-loader-data))
      #+(or)
      (use-effect (=> ()
                      (when (@ data cached-funding)
                        (set-funding (@ data cached-funding)))
                      (when (@ data cached-description)
                        (set-funding (@ data cached-description)))
                      (when (@ data cached-name)
                        (set-name (@ data cached-name)))
                      undefined) [])
      (psx (:*card :class-name "w-full h-auto min-h-[50vh] shadow-ant-light"
            (:*form :method "post"
             (:input :type "hidden" :name "name" :value (:ps name))
             (:input :type "hidden" :name "description" :value (:ps description))
             (:*space :direction "vertical" 
              (:*space
               (:*button :on-click (:ps (=> () (set-funding 10) nil)) "$ 10")
               (:*button :on-click (:ps (=> () (set-funding 100) nil)) "$ 100")
               (:*button :on-click (:ps (=> () (set-funding 1000) nil)) "$ 1000")
               (:*button :on-click (:ps (=> () (set-funding 10000) nil)) "$ 10000"))
              (:*input-number :class-name "w-full"
               :name "amount"
               :value (:ps funding)
               :on-change (:ps (=> (e) (set-funding (or e 0)) nil))
               :prefix "$"
               :step (:ps 10))
              (:*button 
               :type "primary"
               :html-type "submit"
               :disabled (:ps next-disabled)
               (:ps (+ "Confirm and Commit $" funding))))))))
    (export-remix *fund-form :a)))


;; TEST UNDER HERE
