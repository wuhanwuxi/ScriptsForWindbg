/// <reference path="JSProvider.d.ts" />

"use strict";


function initializeScript()
{
//    host.diagnostics.debugLog("Hello from `initializeScript`\n");
    return [new host.apiVersionSupport(1, 7)];
}

function openFile(path)
{
    var file;
    if(host.namespace.Debugger.Utility.FileSystem.FileExists(path)){
        file = host.namespace.Debugger.Utility.FileSystem.OpenFile(path);
    }
    else
    {
        file = host.namespace.Debugger.Utility.FileSystem.CreateFile(path);
    }
    return file;
}

function closeFile( file)
{
    file.Close();
}
function writeFile(textWriter, line)
{    
    textWriter.WriteLine(line);
}
/*
function readFile(name)
{
  var file = host.namespace.Debugger.Utility.FileSystem.OpenFile(name);
  var textReader = host.namespace.Debugger.Utility.FileSystem.CreateTextReader(file);
  host.diagnostics.debugLog(textReader.ReadLine());
  file.Close();
}
*/
function printStackToFile(textWriter, thread)
{
    for (var line of thread.Stack.Frames)
        writeFile(textWriter, line);
}

function printAllProcessToFile(path)
{
    host.diagnostics.debugLog('>> printAllProcessToFile\n')

    var file = openFile(path);
    var textWriter = host.namespace.Debugger.Utility.FileSystem.CreateTextWriter(file);

    writeFile(textWriter, host.currentSession+'\n')

    var i = 0;
    var j = 0;
    for(var process of host.currentSession.Processes)
    {
        writeFile(textWriter, "PROCESS "+(i++)+": id 0x"+process.Id.toString(16)+"; name "+process.Name+'\n')
        for (var thread of process.Threads)
        {
            writeFile(textWriter, "\nthread "+(j++)+": "+thread.Id.toString(16)+'\n')
            printStackToFile(textWriter, thread);
        }
    }
    closeFile(file);
    host.diagnostics.debugLog('<< printAllProcessToFile\n')
}

function invokeScript()
{
    var localpath = "C:\\workspace\\ScriptsForWindbgPreview\\DumpAnalysis_AllThreads.txt";
    printAllProcessToFile(localpath);
    
    //host.currentThread.Stack;
    //host.diagnostics.debugLog(host.currentThread.Stack.debugLog+"\n");
 //   host.diagnostics.debugLog(host.namespace.Debugger.Utility.Control.ExecuteCommand('k\n'));


}

function uninitializeScript()
{
//    host.diagnostics.debugLog("Goodbye from `uninitializeScript`\n");
}
