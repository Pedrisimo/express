"use strict";
module.exports = [
    {
        pattern: '/',
        methods: ['GET'],
        action: 'onform::getForm'
    },
        {
        pattern: '/form',
        methods: ['GET'],
        action: 'onform::getForm'
    },
    {
        pattern: '/items',
        methods: ['POST'],
        action: 'items::postAction'
    },
    {
        pattern: '/items',
        methods: ['DELETE'],
        action: 'items::deleteAllAction'
    },
    {
        pattern: '/items',
        methods: ['GET'],
        action: 'items::getAction'
    },
    {
      pattern: '/public/.*',
      methods: ['GET'],
      action: 'scripts::getScripts'
    }
];
