'use client';
import { authClient } from '@/lib/auth-client';
import { AlertDialog, Button } from '@heroui/react';
import { Trash2, X, AlertTriangle } from 'lucide-react';

import React from 'react';
import toast from 'react-hot-toast';

const DeleteFacilityAlert = ({ facility }) => {
  const { _id, name } = facility;

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    const serverUrl =
      process.env.NEXT_PUBLIC_SERVER_URL ;

    try {
      const res = await fetch(`${serverUrl}/facilities/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to discard facility records');
      }

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.error('Arena record successfully terminated!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Operational deletion error:', error);
      alert(
        'An error occurred during termination. Please execute request again.',
      );
    }
  };

  return (
    <div className="w-full sm:w-auto md:w-full">
      <AlertDialog>
        {/* Delete Button */}
        <Button className="w-full sm:w-auto md:w-full text-rose-400 hover:text-white bg-rose-500/5 hover:bg-rose-600 font-semibold px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-all text-sm border border-rose-500/10 hover:border-rose-500">
          🗑️ Delete
        </Button>

        <AlertDialog.Backdrop className="bg-black/70 backdrop-blur-sm">
          <AlertDialog.Container>
            {/* Delete Modal */}
            <AlertDialog.Dialog className="sm:max-w-md bg-[#14161d] text-white border border-zinc-800/80 p-2 shadow-2xl rounded-2xl overflow-hidden">
              <AlertDialog.CloseTrigger className="top-4 right-4 text-zinc-400 hover:text-white transition-colors" />

              <AlertDialog.Header className="flex items-center gap-4 px-6 pt-6">
                <div className="bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 text-rose-500">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <AlertDialog.Heading className="text-lg font-bold text-white tracking-tight">
                    Terminate Arena Listing
                  </AlertDialog.Heading>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Destructive core operation
                  </p>
                </div>
              </AlertDialog.Header>

              <AlertDialog.Body className="px-6 py-4">
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Are you absolutely certain you want to remove{' '}
                  <strong className="text-rose-400 font-semibold">
                    &quot;{name}&quot;
                  </strong>
                  ? This process clears tracking caches and permanently wipes
                  all slot structural maps from the system.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer className="px-6 pb-6 pt-4 flex justify-end gap-3 border-t border-zinc-800/40 mt-2">
                {/* Cancel Trigger */}
                <Button
                  slot="close"
                  variant="none"
                  className="bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-semibold px-5 h-11 rounded-xl transition-all cursor-pointer text-sm"
                >
                  Cancel
                </Button>

                {/* Delete Trigger */}
                <Button
                  onClick={handleDelete}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 h-11 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-rose-600/10 active:scale-95 cursor-pointer text-sm"
                >
                  <Trash2 size={16} />
                  Confirm Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteFacilityAlert;
