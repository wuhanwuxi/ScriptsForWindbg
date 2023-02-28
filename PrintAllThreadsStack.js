/// <reference path="JSProvider.d.ts" />

"use strict";

function initializeScript()
{
//    host.diagnostics.debugLog("Hello from `initializeScript`\n");
    return [new host.apiVersionSupport(1, 7)];
}


function printCurrentStack_byCmd()
{
    var ctl = host.namespace.Debugger.Utility.Control;   
    var outputLines = ctl.ExecuteCommand("kvn\n");
    for (var line of outputLines)
    {
        host.diagnostics.debugLog(line+'\n')
    }
}

function printCurrentStack_byVariable()
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

function printStack(thread)
{
    for (var line of thread.Stack.Frames)
        host.diagnostics.debugLog(line+'\n')
}

function browseAllProcess()
{
    host.diagnostics.debugLog('>> browseAllProcess\n')
    host.diagnostics.debugLog(host.currentSession+'\n')
    var i = 0;
    var j = 0;
    for(var process of host.currentSession.Processes)
    {
//        host.diagnostics.debugLog("PROCESS %d: id 0x%x; name %s\n\n", (i++), process.Id, process.Name);
        host.diagnostics.debugLog("PROCESS "+(i++)+": id 0x"+process.Id.toString(16)+"; name "+process.Name+'\n')
        for (var thread of process.Threads)
        {
            host.diagnostics.debugLog("\nthread "+(j++)+": "+thread.Id.toString(16)+'\n')
            printStack(thread);
        }
    }
    host.diagnostics.debugLog('<< browseAllProcess\n')
}

function invokeScript()
{
    browseAllProcess();
    
    //host.currentThread.Stack;
    //host.diagnostics.debugLog(host.currentThread.Stack.debugLog+"\n");
 //   host.diagnostics.debugLog(host.namespace.Debugger.Utility.Control.ExecuteCommand('k\n'));


}

function uninitializeScript()
{
//    host.diagnostics.debugLog("Goodbye from `uninitializeScript`\n");
}
