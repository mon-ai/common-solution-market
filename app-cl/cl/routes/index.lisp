(load "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/cl/setup.lisp")
(in-package :parenscript)

(setf *ps-html-mode* :xml)

(defun sp (n)
  (format nil "~{~A~}"
          (rutils:iter (:for i :from 1 :to n)
            (:collect "&nbsp;"))))

;; WORK UNDER HERE
(workspace::write-file 
  "/Volumes/EP_1TB/Development/common-ai/solution-market/app-cl/js/remix/app/routes/mmon.jsx"
  (ps
    ;; imports
    ; browser
    (import-many ((dobj use-effect) "react")
                 ((dobj use-loader-data *outlet) "@remix-run/react")
                 ((dobj *config-provider) "antd"))
    ; server
    (import-many ((dobj json) "@remix-run/node")
                 ((dobj presetPalettes) "@ant-design/colors"))

    ;; banner
    (defun *banner ()
      (psx (:div :class-name "flex flex-row flex-no-wrap w-screen h-20"
            (:div :class-name "bg-white w-1/2 flex flex-row flex-wrap justify-between px-4"
             (:a :href "https://mmonai.co/" :target "_blank" :rel "noreferrer"
              (:h1 :class-name "font-title text-3xl"
               (:span :class-name "text-ant" ".co") :br (sp 3)"mmonAI"))
             (:h1 :class-name "font-title text-3xl" ".common"))
            (:div :class-name "bg-ant w-1/2 px-4"
             (:h1 :class-name "font-title text-3xl" "solution market" :br (sp 6)
              (:em :class-name "text-white" "proposals"))))))

    ;; loader
    (async-defun loader ()
                 (defun get-color ()
                   (defconstant keys (chain *object (keys preset-palettes)))
                   (defconstant palette 
                     (@ preset-palettes (@ keys (<< (* (@ keys length) (random)) 
                                                    0))))
                   (elt palette 4))
                 (json (create color (get-color)))) 

    ;; page function
    (defun *index ()
      (var *__PS_MV_REG*) ; ps compat
      (defconstant (dobj color) (use-loader-data))
      (use-effect (=> () 
                    (chain *config-provider 
                           (config (create 'theme (create 'primary-color color))))
                    undefined) [])
      (psx (:div (:*banner ) :*outlet)))
    (export-remix *index :l)))

;; TEST UNDER HERE
(ps 
  (defconstant keys (chain *object (keys preset-palettes)))
  (defconstant palette (@ preset-palettes (@ keys (<< (* (@ keys length) (random)) 0)))))
  

