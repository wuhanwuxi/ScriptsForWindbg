"use strict";

function initializeScript()
{
    host.diagnostics.debugLog("Hello from `initializeScript`\n");
    return [new host.apiVersionSupport(1, 7)];
}

export {helloWorld};

function helloWorld()
{

    host.diagnostics.debugLog("Hello from `invokeScript`\n");

}

function invokeScript()
{
    //
    // Insert your script content here.  This method will be called whenever the script is
    // invoked from a client.
    //
    // See the following for more details:
    //
    //     https://aka.ms/JsDbgExt
    //
    helloWorld()
}

function uninitializeScript()
{
    host.diagnostics.debugLog("Goodbye from `uninitializeScript`\n");
}
