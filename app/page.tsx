'use client';
import HomeMenu from './_components/screens/HomeMenu';

export default function WS() {
  /* useEffect(() => {
    // Se define el socket
    const socket = io('http://localhost:3001', {
      transports: ['websocket'],
    });

    // Desde el cliente emitimos el mensaje de 'hello' 
    socket.emit('hello', { player: 1 });

    // Recibimos e imprimimos el mensaje del server
    socket.on('hello', (data) => {
      console.log('Respuesta del servidor:', data);
    });
  }, []); */

  return (
    <div>
      <HomeMenu />
      <div>Information</div>
    </div>
  );
}
