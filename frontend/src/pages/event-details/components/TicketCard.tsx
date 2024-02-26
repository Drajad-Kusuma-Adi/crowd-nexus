import { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { api } from "../../../guard/Api";

function TicketCard({id, name, benefits, price}: {id: number, name: string, benefits: string, price: string}) {
    const [openBenefits, setOpenBenefits] = useState(false);
    const handleOpenBenefits = () => setOpenBenefits((cur) => !cur);

    function purchaseTicket() {
        api.get('/checkToken', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then((response) => {
            api.post('/purchaseTicket', {
                user_id: response.data.user.id,
                ticket_id: id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(() => {
                alert('You purchased a ticket');
            })
            .catch((error) => {
                console.log(error);
            })
          })
          .catch((error) => {
            console.log(error);
          })
    }

    return (
        <>
            <Dialog className="p-4" size="md" open={openBenefits} handler={handleOpenBenefits} placeholder={undefined}>
                <p className="font-ubuntu-condensed text-justify"><span className="text-2xl font-bold">Benefits:</span> <br /> <span className="opacity-50">{benefits}</span></p>
            </Dialog>
            <div className="my-2 w-[100%] flex flex-col items-center rounded-lg border border-black shadow-md py-4 px-8">
                <p className='text-4xl font-bold'>{name}</p>
                <p className='opacity-50'>{price}</p>
                <div className="flex">
                    <button onClick={purchaseTicket} className="w-full mx-2 my-1 text-white rounded-lg bg-blue-600 hover:bg-blue-800 hover:text-white transition duration-300 font-ubuntu-condensed text-center cursor-pointer px-4 py-2">Buy</button>
                    <button onClick={handleOpenBenefits} className="border border-black w-full mx-2 my-1 text-black rounded-lg bg-white hover:bg-blue-600 hover:text-white transition duration-300 font-ubuntu-condensed text-center cursor-pointer px-4 py-2">Benefits</button>
                </div>
            </div>
        </>
    )
}

export default TicketCard;