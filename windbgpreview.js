"use strict";

function initializeScript()
{
//    host.diagnostics.debugLog("Hello from `initializeScript`\n");
    return [new host.apiVersionSupport(1, 7)];
}


function printCurrentStack()
{
    var ctl = host.namespace.Debugger.Utility.Control;   
    var outputLines = ctl.ExecuteCommand("kvn\n");
    for (var line of outputLines)
    {
        host.diagnostics.debugLog(line+'\n')
    }
}

function printCurrentStack1()
{
    host.diagnostics.debugLog(host.currentProcess.Threads.length+'\n')
    host.diagnostics.debugLog(typeof(host.currentProcess.Threads)+'\n')

    var i=0;
    for (var thread of host.currentProcess.Threads)
    {
        host.diagnostics.debugLog("Stack "+(i++)+": "+thread.Id+'\n')
        for (var line of thread.Stack.Frames)
            host.diagnostics.debugLog(line+'\n')
    }
    
}


function invokeScript()
{
    printCurrentStack();
    
    //host.currentThread.Stack;
    //host.diagnostics.debugLog(host.currentThread.Stack.debugLog+"\n");
 //   host.diagnostics.debugLog(host.namespace.Debugger.Utility.Control.ExecuteCommand('k\n'));


}

function uninitializeScript()
{
//    host.diagnostics.debugLog("Goodbye from `uninitializeScript`\n");
}
