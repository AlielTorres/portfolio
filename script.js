// Replace this URL with your Railway backend URL after deployment!
const SOCKET_SERVER_URL = "https://your-railway-url.up.railway.app";

const socket = io(SOCKET_SERVER_URL);

const statusEl = document.getElementById("status");
const gameLog = document.getElementById("game-log");

socket.on("connect", () => {
  statusEl.textContent = "Connected as " + socket.id;
  socket.emit("joinGame");
});

socket.on("playerJoined", (players) => {
  gameLog.innerHTML += `<p>Players in room: ${players.join(", ")}</p>`;
});

socket.on("startGame", (data) => {
  gameLog.innerHTML += `<p>Game started! Player HP: ${data.hp.join(", ")}</p>`;
});

socket.on("enemyMove", (move) => {
  gameLog.innerHTML += `<p>Enemy used move: <b>${move}</b></p>`;
});

socket.on("playerLeft", () => {
  gameLog.innerHTML += `<p>Opponent left the game.</p>`;
});

socket.on("disconnect", () => {
  statusEl.textContent = "Disconnected";
});

function sendMove(move) {
  gameLog.innerHTML += `<p>You used move: <b>${move}</b></p>`;
  socket.emit("move", move);
}
