import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSlotTime } from "../../redux/actions/appointmentAction";

const SlotsGrid = ({ slots }) => {
  const dispatch = useDispatch();
  const selectedSlot = useSelector((state) => state.appointment.selectedSlot);

  const handleSlotClick = (slotTime) => {
    dispatch(selectSlotTime(slotTime));
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl w-full">
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slot, index) => (
          <div key={index} className="p-2 text-sm font-semibold text-center rounded-lg cursor-pointer border transition"
            onClick={() => slot.status === "avl" && handleSlotClick(slot.slotTime)}
            style={{
              backgroundColor: slot.status === "avl" ? "#D1FAE5" : "#F3F4F6",
              color: slot.status === "avl" ? "black" : "gray",
              opacity: slot.status === "avl" ? 1 : 0.5,
              borderWidth: selectedSlot === slot.slotTime ? "2px" : "1px",
            }}>
            {slot.slotTime}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotsGrid;
