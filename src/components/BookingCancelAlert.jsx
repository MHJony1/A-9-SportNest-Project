'use client';

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { AlertDialog, Button } from '@heroui/react';
import { Trash2, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingCancelAlert = ({ booking, onCancelSuccess }) => {
  const { _id, facilityName, bookingDate, slot } = booking;

  const handleCancelBooking = async () => {
    const { data: tokenData } = await authClient.token();
    
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL;

    try {
      const res = await fetch(`${serverUrl}/bookings/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to terminate slot reservation');
      }

      const data = await res.json();
      
      if (data.deletedCount > 0 || res.status === 200) {
        toast.error('Slot reservation successfully terminated!');
        
        if (onCancelSuccess) {
          onCancelSuccess(_id);
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Operational termination transit error:', error);
      toast.error('An error occurred during termination. Please try again.');
    }
  };

  return (
    <div className="w-full sm:w-auto">
      <AlertDialog>
        {/* Trigger Button */}
        <Button className="w-full sm:w-auto inline-flex items-center gap-2 text-xs font-black text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 px-4 py-3 rounded-xl border border-rose-500/10 hover:border-rose-500/30 transition-all duration-300 cursor-pointer uppercase tracking-wider shadow-lg">
          <Trash2 size={14} />
          <span>Cancel Slot</span>
        </Button>

        {/* Backdrop Blur Overlayer */}
        <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-md">
          <AlertDialog.Container>
            {/* Main Dialog Panel */}
            <AlertDialog.Dialog className="sm:max-w-md bg-[#14161d] text-white border border-zinc-800/80 p-2 shadow-2xl rounded-2xl overflow-hidden relative">
              
              {/* Ambient Top Glow Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-rose-500/50 to-transparent" />
              
              {/* Close Button X Cross */}
              <AlertDialog.CloseTrigger className="top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer" />

              {/* Header Wing */}
              <AlertDialog.Header className="flex items-center gap-4 px-6 pt-6">
                <div className="bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 text-rose-400 shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <AlertDialog.Heading className="text-base font-black text-white uppercase tracking-wider">
                    Terminate Allocation
                  </AlertDialog.Heading>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                    Destructive Slot Release
                  </p>
                </div>
              </AlertDialog.Header>

              {/* Body Content Context */}
              <AlertDialog.Body className="px-6 py-4">
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium">
                  Are you absolutely certain you want to release your reserved slot for{' '}
                  <strong className="text-rose-400 font-black uppercase">
                    &quot;{facilityName}&quot;
                  </strong>{' '}
                  on <span className="text-zinc-200 font-semibold">{bookingDate}</span> ({slot})? 
                  This process permanently clears the timeline matrix map from the network.
                </p>
              </AlertDialog.Body>

              {/* Footer Control Actions */}
              <AlertDialog.Footer className="px-6 pb-6 pt-4 flex justify-end gap-3 border-t border-zinc-800/40 mt-2">
                {/* Abort/Cancel Trigger */}
                <Button
                  slot="close"
                  variant="none"
                  className="bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-black px-5 h-11 rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  Abort Routine
                </Button>

                {/* Confirm Deletion Trigger */}
                <Button
                  onClick={handleCancelBooking}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-black px-5 h-11 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-rose-900/20 hover:shadow-rose-600/20 active:scale-95 cursor-pointer text-xs uppercase tracking-wider"
                >
                  <Trash2 size={14} />
                  Confirm Terminate
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default BookingCancelAlert;