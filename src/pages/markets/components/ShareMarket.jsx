import React, { useState } from "react";
import deletePng from "../../../assets/delete.png";
import maleImg from "../../../assets/male.png";
import femaleImg from "../../../assets/female.png";
import CustomModal from "../../../components/CustomModal";
import DeleteUser from "./DeleteUser";
import PrimaryButton from "../../../components/PrimaryButton";
import InviteForm from "./InviteForm";
import { useStore } from "../../../store/userStore";

const ShareMarket = ({ onClose, selectMarket, refetch }) => {
  const {user} = useStore()
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectUser, setSelectUser] = useState(null)
  const handleOpen = (type, user) => {
    setModalType(type);
    setOpen(true);
    if(type == "delete"){
        setSelectUser(user);
    }
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };
console.log(selectMarket?.marketCreator);

  return (
    <div>
      <div>
        <p className="text-[#1E1E1E] font-[500] text-[18px]">
          Faol ishtirokchilar
        </p>
        <ul className="p-[12px]">
          {selectMarket?.users?.map((item, i) => (
            <li
              key={i}
              className={`flex justify-between items-center ${
                i != 0 ? "border-t border-[#E0E0E0] pt-[12px] mt-[12px]" : ""
              } `}
            >
              <div className="flex gap-[8px] items-center">
                <div>
                  <img
                    src={item?.gender == "erkak" ? maleImg : femaleImg}
                    alt="avatar"
                  />
                </div>
                <div>
                  <div className="text-[16px] font-[600] text-[#1E1E1E]">
                    {item?.phoneNumber}
                  </div>
                  <div className="text-[15px] text-[#4B4B4B]">
                    {item?.fullName} {item?.id == user?.id && "(siz)"}
                  </div>
                </div>
              </div>
              {
                selectMarket?.marketCreator == user?.id && user?.id !== item?.id && <div
                onClick={() => handleOpen("delete", item)}
                className="cursor-pointer"
              >
                <img src={deletePng} alt="delete icon" />
              </div>
              }
            </li>
          ))}
        </ul>
      </div>
      <div>
        {selectMarket?.marketCreator == user?.id && <PrimaryButton
          onClick={() => handleOpen("share")}
          className="py-[10px] rounded-[14px] font-[500] w-full text-[17px]"
        >
          Taklif qilish
        </PrimaryButton>}
      
      </div>
      <CustomModal
        open={open}
        title={
          modalType == "delete" ? "Ishtirokchini o'chirish" : "Taklif qilish"
        }
        onCancel={handleClose}
        width={351}
      >
        {modalType == "delete" ? <DeleteUser
          selectUser={selectUser}
          onClose={handleClose}
          refetch={refetch}
          marketId={selectMarket?.id}
        /> : <InviteForm marketId={selectMarket?.id} onClose={handleClose} refetch={refetch}/>}
      </CustomModal>
    </div>
  );
};

export default ShareMarket;
