import { socketInterpreterProvider } from '../../common/interpreter/socket_interpret';
import { socket } from '../socket';
import { types } from '../lib/types';
import { functions } from '../lib/functions';

// Create the function list
socket.emit('getFunctionList');
const getServerFunctions = new Promise((resolve) => socket.once('functionList', resolve));

// Use the above promise to seed the interpreter with the functions it can defer to
export function interpretAst(ast, context) {
  return getServerFunctions
  .then(serverFunctionList =>
    socketInterpreterProvider({
      types: types.toJS(),
      functions: functions.toJS(),
      referableFunctions: serverFunctionList,
      socket: socket,
    }))
  .then(interpretFn => interpretFn(ast, context));
}

socket.on('run', (msg) => {
  interpretAst(msg.ast, msg.context)
  .then(resp => {
    socket.emit('resp', { value: resp, id: msg.id });
  });
});
