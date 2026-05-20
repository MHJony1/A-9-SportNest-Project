'use client';
import React from 'react';
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
  TextArea,
} from '@heroui/react';
import { Edit3, Save, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function EditFacilityModal({ facility }) {
  // PlayNest database fields extraction
  const {
    _id,
    name,
    image,
    location,
    price_per_hour,
    price,
    capacity,
    facility_type,
    description,
    available_slots,
  } = facility;

  // Sports type categories configuration
  const facilityTypes = [
    { id: 'football', name: 'Football' },
    { id: 'cricket', name: 'Cricket' },
    { id: 'badminton', name: 'Badminton' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'tennis', name: 'Tennis' },
    { id: 'volleyball', name: 'Volleyball' },
  ];

  // Available slots options configuration
  const slotOptions = [
    { id: 'morning', name: 'Morning (6:00 AM - 12:00 PM)' },
    { id: 'afternoon', name: 'Afternoon (12:00 PM - 5:00 PM)' },
    { id: 'evening', name: 'Evening (5:00 PM - 9:00 PM)' },
    { id: 'night', name: 'Night (9:00 PM - 12:00 AM)' },
    { id: 'all_day', name: 'Full Day Open (6:00 AM - 12:00 AM)' },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateData = Object.fromEntries(formData.entries());

    // Format fields to correct types before payload transit
    if (updateData.price_per_hour)
      updateData.price_per_hour = Number(updateData.price_per_hour);
    if (updateData.capacity) updateData.capacity = Number(updateData.capacity);

    // Retrieve active verification tokens from Better Auth client instance
    const { data: tokenData } = await authClient.token();
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL;

    try {
      const res = await fetch(`${serverUrl}/facilities/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success('Facility records modified successfully!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Operational layer modification error:', error);
    }
  };

  return (
    <Modal>
      {/* Modal Trigger Button */}
      <Button className="w-full sm:w-auto md:w-full text-zinc-300 hover:text-white bg-zinc-800/40 hover:bg-zinc-800 font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all text-sm border border-zinc-800 hover:border-zinc-700">
        ✏️ Edit
      </Button>

      <Modal.Backdrop className="bg-black/60 backdrop-blur-sm">
        <Modal.Container placement="auto">
          {/* Main Dark Theme Container Panels Mapping */}
          <Modal.Dialog className="sm:max-w-2xl bg-[#14161d] text-white border border-zinc-800/80 shadow-2xl overflow-hidden rounded-2xl">
            <Modal.CloseTrigger className="text-zinc-400 hover:text-white transition-colors" />

            {/* Modal Header */}
            <Modal.Header className="px-8 pt-10 pb-4 border-b border-zinc-800/40">
              <Modal.Heading className="text-2xl font-black tracking-tight uppercase">
                ⚙️ Configure{' '}
                <span className="text-[#a3e635] font-extrabold italic">
                  Arena Matrix
                </span>
              </Modal.Heading>
              <p className="mt-1.5 text-sm text-zinc-400 font-medium">
                Optimize operational attributes, peak hours, and monetization
                layers for{' '}
                <span className="text-white font-semibold">
                  &quot;{name}&quot;
                </span>
              </p>
            </Modal.Header>

            <Modal.Body className="px-8 py-6 max-h-[70vh] overflow-y-auto">
              <Surface
                variant="default"
                className="bg-transparent border-none p-0"
              >
                <form
                  id="update-facility-form"
                  onSubmit={onSubmit}
                  className="space-y-5 text-left"
                >
                  {/* Facility Name Text Field */}
                  <TextField
                    defaultValue={name}
                    name="name"
                    isRequired
                    className="w-full"
                  >
                    <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                      Facility / Arena Title
                    </Label>
                    <Input
                      placeholder="e.g., Old Trafford Turf"
                      className="bg-[#0d0e12] border border-zinc-800/60 focus:border-[#a3e635]/50 rounded-xl h-12 w-full text-white px-4 transition-all"
                    />
                  </TextField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Location Field */}
                    <TextField
                      defaultValue={location}
                      name="location"
                      isRequired
                    >
                      <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                        Location Address
                      </Label>
                      <Input
                        placeholder="e.g., Mirpur, Dhaka"
                        className="bg-[#0d0e12] border border-zinc-800/60 focus:border-[#a3e635]/50 rounded-xl h-12 w-full text-white px-4 transition-all"
                      />
                    </TextField>

                    {/* Facility Type Category Selection */}
                    <Select
                      defaultValue={facility_type || 'football'}
                      name="facility_type"
                      isRequired
                    >
                      <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                        Sport Category Type
                      </Label>
                      <Select.Trigger className="bg-[#0d0e12] border border-zinc-800/60 text-white rounded-xl h-12 w-full px-4 flex items-center justify-between">
                        <Select.Value placeholder="Select Sport Module" />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover className="bg-[#14161d] border border-zinc-800 text-white rounded-xl shadow-xl overflow-hidden mt-1">
                        <ListBox items={facilityTypes}>
                          {(item) => (
                            <ListBox.Item
                              key={item.id}
                              id={item.id}
                              textValue={item.name}
                              className="p-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                            >
                              {item.name}
                            </ListBox.Item>
                          )}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Hourly Rental Rate Input */}
                    <TextField
                      defaultValue={price_per_hour || price}
                      name="price_per_hour"
                      type="number"
                      isRequired
                    >
                      <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                        Rental Cost (USD / hr)
                      </Label>
                      <Input
                        placeholder="e.g., 45"
                        className="bg-[#0d0e12] border border-zinc-800/60 focus:border-[#a3e635]/50 rounded-xl h-12 w-full text-white px-4 transition-all"
                      />
                    </TextField>

                    {/* Maximum Squad Size Player Capacity */}
                    <TextField
                      defaultValue={capacity}
                      name="capacity"
                      type="number"
                      isRequired
                    >
                      <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                        Max Player Capacity
                      </Label>
                      <Input
                        placeholder="e.g., 14"
                        className="bg-[#0d0e12] border border-zinc-800/60 focus:border-[#a3e635]/50 rounded-xl h-12 w-full text-white px-4 transition-all"
                      />
                    </TextField>
                  </div>

                  {/* Available Schedule Slot */}
                  <Select
                    defaultValue={available_slots || 'all_day'}
                    name="available_slots"
                    isRequired
                  >
                    <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                      Available Schedule Slot
                    </Label>
                    <Select.Trigger className="bg-[#0d0e12] border border-zinc-800/60 text-white rounded-xl h-12 w-full px-4 flex items-center justify-between">
                      <Select.Value placeholder="Select Operating Slot" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="bg-[#14161d] border border-zinc-800 text-white rounded-xl shadow-xl overflow-hidden mt-1">
                      <ListBox items={slotOptions}>
                        {(item) => (
                          <ListBox.Item
                            key={item.id}
                            id={item.id}
                            textValue={item.name}
                            className="p-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                          >
                            {item.name}
                          </ListBox.Item>
                        )}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {/* Media Banner Image */}
                  <TextField
                    defaultValue={image}
                    name="image"
                    type="url"
                    isRequired
                  >
                    <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                      Media Banner Image URL
                    </Label>
                    <Input
                      placeholder="https://images.unsplash.com/... or ImgBB link"
                      className="bg-[#0d0e12] border border-zinc-800/60 focus:border-[#a3e635]/50 rounded-xl h-12 w-full text-white px-4 transition-all"
                    />
                  </TextField>

                  {/* Text Description Profile */}
                  <TextField
                    defaultValue={description}
                    name="description"
                    isRequired
                  >
                    <Label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                      Operational Venue Descriptions
                    </Label>
                    <TextArea
                      placeholder="Provide specific notes regarding lighting setups, turf quality, or footwear constraints..."
                      className="bg-[#0d0e12] border border-zinc-800/60 focus:border-[#a3e635]/50 rounded-xl min-h-24 p-3 w-full text-white transition-all resize-none"
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer className="px-8 pt-4 pb-8 flex items-center justify-end border-t border-zinc-800/40 gap-4">
              {/* Dismiss Control Action Button */}
              <Button
                slot="close"
                className="flex items-center gap-2 bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-semibold px-5 h-11 rounded-xl transition-all cursor-pointer"
              >
                <X size={16} /> Dismiss
              </Button>

              {/* Submit Control Action Button */}
              <Button
                type="submit"
                form="update-facility-form"
                className="flex items-center gap-2 bg-[#a3e635] hover:bg-[#84c225] text-black font-extrabold px-6 h-11 rounded-xl shadow-lg shadow-[#a3e635]/10 transition-all transform active:scale-95 cursor-pointer"
              >
                <Save size={16} /> Save Changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
