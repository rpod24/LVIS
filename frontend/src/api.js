import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // adjust if backend on another port
});


export const fetchJson = (route) =>
  api.get(route).then(r => r.data);

/* ---------- facilities ---------- */
export const listFacilities = () =>
  api.get("/facilities").then(r => {
    console.log("Facilities fetched:", r.data);
    return r.data;
  });

/* ---------- manifests ---------- */
export const listManifests = () =>
  api.get("/manifests").then(r => r.data);

export const getManifest = (id) =>
  api.get(`/manifests/${id}`).then(r => r.data);

export const saveManifest = (manifest) =>
  manifest._id
    ? api.put(`/manifests/${manifest._id}`, manifest).then(r => r.data)
    : api.post("/manifests", manifest).then(r => r.data);

export const createManifest = (payload) => 
  api.post("/manifests", payload).then(r => r.data);


/* ---------- rooms (sub-docs) ---------- */
export const addRoom = (manifestId, room) =>
  api.post(`/manifests/${manifestId}/rooms`, room).then(r => r.data);

export const updateRoom = (manifestId, roomId, room) =>
  api.put(`/manifests/${manifestId}/rooms/${roomId}`, room).then(r => r.data);

export const deleteRoom = (manifestId, roomId) =>
  api.delete(`/manifests/${manifestId}/rooms/${roomId}`);

/* ---------- cms ---------- */
export const listCms = (manifestId) =>
  api.get(`/cms`, { params: { manifest: manifestId } }).then(r => r.data);

export const createCms = (payload) =>
  api.post("/cms", payload).then(r => r.data);

export const updateCms = (id, payload) =>
  api.put(`/cms/${id}`, payload).then(r => r.data);

/* ---------- med ---------- */
export const listMeds = (manifestId) =>
  api.get(`/meds`, { params: { manifest: manifestId } }).then(r => r.data);

export const createMed = (payload) =>
  api.post("/meds", payload).then(r => r.data);

export const updateMed = (id, payload) =>
  api.put(`/meds/${id}`, payload).then(r => r.data);

/* ---------- locations ---------- */
export const listLocations = (facilityId) =>
  api.get(`/locations`, { params: { facility: facilityId } }).then(r => r.data);

export const createLocation = (payload) =>
  api.post("/locations", payload).then(r => r.data);

export const updateLocation = (id, payload) =>
  api.put(`/locations/${id}`, payload).then(r => r.data);

export const getFacility = (id) =>
  api.get(`/facilities/${id}`).then(r => r.data);

export const listTickets   = () => fetchJson("/api/tickets");
export const getTicket     = (id) => fetchJson(`/api/tickets/${id}`);
export const createTicket  = (body) => fetchJson("/api/tickets", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
});

const exported = {
  listFacilities,
  listManifests,
  getManifest,
  saveManifest,
  createManifest,
  addRoom,
  updateRoom,
  deleteRoom,
  listCms,
  createCms,
  updateCms,
  listMeds,
  createMed,
  updateMed,
  listLocations,
  createLocation,
  updateLocation,
  getFacility
};

export default exported;