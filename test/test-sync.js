'use strict';

var assert = require('assert'),
    net = require('net'),
    connectionTester = require('../index');


describe('Connection tester - Sync', function () {
    var dummyServer,
        dummyServerPort = 9998;

    before(function (next) {
        dummyServer = net.createServer(function (c) {
            c.on('end', function () {});
        });
        dummyServer.listen(dummyServerPort, function () {
            next();
        });

    });

    after(function (next) {
        dummyServer.close();
        next();
    });

    it('should connect to localhost', function (next) {
        var connectOut = connectionTester.test('localhost', dummyServerPort);
        assert.ok(connectOut.error === null);
        assert.ok(connectOut.success === true);
        next();
    });

    it('should connect to www.google.com 443', function (next) {
        var connectOut = connectionTester.test('www.google.com', 443);
        assert.ok(connectOut.error === null);
        assert.ok(connectOut.success === true);
        next();
    });

    it('should connect to www.yahoo.com 80', function (next) {
        var connectOut = connectionTester.test('www.yahoo.com', 80);
        assert.ok(connectOut.error === null);
        assert.ok(connectOut.success === true);
        next();
    });

    it('should return false while connecting to dead port on localhost', function (next) {
        var connectOut = connectionTester.test('localhost', 9999);
        assert.ok(connectOut.error === 'connect ECONNREFUSED');
        assert.ok(connectOut.success === false);
        next();
    });

    it('should return false while connecting to 5678 port on www.example.com', function (next) {
        var connectOut = connectionTester.test('www.example.com', 5678);
        assert.ok(connectOut.error === 'socket TIMEOUT');
        assert.ok(connectOut.success === false);
        next();
    });

});

