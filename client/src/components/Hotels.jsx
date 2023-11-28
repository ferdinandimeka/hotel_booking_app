/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Rating from "../components/Rating";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const Hotels = ({ hotel }) => {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
        <Card key={hotel._id} className='shadow-md'>
          <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-start ">
            <h4 className='font-bold text-large'>{hotel.name}</h4>
            <>
              <Button 
                onPress={onOpen} 
                color="secondary" 
                className="border border-solid px-4 py-2 transition-all duration-300 
                focus:border-2 focus:border-blue-500 active:border-2 hover:border-2"
              >
                  Book Now !
              </Button>
              <Modal 
                backdrop="opaque" 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                radius="2xl"
                classNames={{
                  body: "py-6",
                  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                  base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                  header: "border-b-[1px] border-[#292f46]",
                  footer: "border-t-[1px] border-[#292f46]",
                  closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">{hotel.title}</ModalHeader>
                      <ModalBody>
                        <p>{hotel.description}</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="foreground" variant="light" onPress={onClose}>
                          Close
                        </Button>
                        <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                          Book
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          </CardHeader>
          <CardBody className='overflow-visible py-2'>
            <Link to={`/hotels/${hotel._id}`}>
                <Image isZoomed src={hotel.photo} width="100%" height="100%" />
            </Link>
            <p className="font-bold text-small text-violet-700 pt-2">{`Least: #${hotel.cheapestPrice}`}</p>
            <p className="font-bold text-small text-violet-700">{`Address: ${hotel.address}`}</p>
            <p className="font-bold text-small text-violet-700">{`city: ${hotel.city}`}</p>
            <p className="font-bold text-small text-violet-700">{`country: ${hotel.country}`}</p>
            <Rating value={hotel.rating} text={`type: ${hotel.type}`} color={'#03A9F4'} />
          </CardBody>
        </Card>
  )
}

export default Hotels