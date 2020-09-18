// ==UserScript==
// @name         Clients and Profits Greaser
// @namespace    http://tampermonkey.net/
// @version      0.1.2
// @description  Makes using the C+P web interface a bit more tolerable, thereby making the world a more wonderful place.
// @author       You
// @match        https://grayloon.jobr.mobi/index.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Is it working?
    console.log('tampermonkey working');

    // create a mutation observer object to check for changes in objects to handle
    var mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'main') {
                init();
            }
            if (mutation.target.id === 'alertwin') {
                handleAlertWindows(mutation.target);
            }
        });
    });

    mutationObserver.observe(document.documentElement, {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    });

    // crush those annoying alert messages about budget hours and other garbage
    function handleAlertWindows(alertwin) {
        // Array of strings or partial strings of alert messages to be matched.
        const annoyingMessages = [
            'has no budget',
            'no estimated hours'
        ];

        let msg = alertwin.textContent;
        let overlay = document.getElementById('control_overlay');
        console.log("Alert Message: " + msg);
        annoyingMessages.forEach(element => {
            if (msg.includes(element)) {
                alertwin.style.display = 'none';
                overlay.style.display = 'none';
            }
        });
    }

    // configure timesheet job and task inputs to use uppercase text always
    function init() {
        console.log('initializing...');
        let jobInput = document.getElementById("COST_JOB_NUM");
        let taskInput = document.getElementById("COST_TASK");

        if(typeof(jobInput) != 'undefined' && jobInput != null){
            jobInput.style.textTransform = 'uppercase';
            taskInput.style.textTransform = 'uppercase'
            let m_alert = null;
            let m_prompt = null;
        } else {
            console.log('no timesheet input found');
        }
    }

    init();

})();
