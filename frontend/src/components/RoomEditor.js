const RoomEditor = ({ room, onChange, onDelete }) => {
  return (
    <div className="room-editor">
      <input
        placeholder="Room Number"
        value={room.roomNumber}
        onChange={e => onChange({ ...room, roomNumber: e.target.value })}
      />
      <input
        placeholder="Group"
        value={room.group}
        onChange={e => onChange({ ...room, group: e.target.value })}
      />
      <textarea
        placeholder="Notes"
        value={room.notes}
        onChange={e => onChange({ ...room, notes: e.target.value })}
      />
      <button onClick={onDelete}>Remove</button>
    </div>
  );
};

export default RoomEditor;
