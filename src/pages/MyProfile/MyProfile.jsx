import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { Briefcase, Phone, Timer, Mail, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Swal from "sweetalert2";
import { Loading } from "../../components/Loading/Loading";

const MyProfile = () => {
  const { user, profileUpdate } = useContext(AuthContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!user) {
    return <Loading />;
  }

  const { displayName, email, photoURL, phoneNumber, metadata } = user;

  // Format dates
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const joinDate = formatDate(metadata.creationTime);
  const lastSignIn = formatDate(metadata.lastSignInTime);

  const handleOpenDialog = () => {
    setName(displayName || "");
    setAvatarUrl(photoURL || "");
    setIsDialogOpen(true);
  };

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await profileUpdate(name, avatarUrl);
      Swal.fire("Profile updated successfully");
      setIsDialogOpen(false);
    } catch (err) {
      Swal.fire("Failed to update profile");
      setIsDialogOpen(false);
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className=" rounded-xl shadow-sm overflow-hidden border">
          {/* Profile Header */}
          <div className="bg-accent p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4  shadow-lg">
                <AvatarImage
                  src={
                    photoURL ||
                    "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                  }
                />
                <AvatarFallback>{displayName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold ">
                  {displayName || "Anonymous User"}
                </h1>
                <p className="text-blue-600 mt-1">{email}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-1">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">
                        Member Since
                      </p>
                      <p className="text-sm text-gray-900">{joinDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-1">
                      <Timer className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">
                        Last Sign In
                      </p>
                      <p className="text-sm text-gray-900">{lastSignIn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-1">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{email}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 mt-1">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">
                        {phoneNumber || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Footer */}
          <div className="bg-accent px-6 py-4 sm:px-8 sm:py-6 flex justify-end border-t ">
            <Button onClick={handleOpenDialog} className="gap-2">
              <Edit className="h-4 w-4" />
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Update Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Profile Picture URL</Label>
              <Input
                id="avatar"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Image URL"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyProfile;
