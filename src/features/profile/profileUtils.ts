import fakeUsers from "./fakeUsers.json";

type Profile = {
  id: number;
  first_name: string; // 255 char max / required",
  last_name: string; // 255 char max / required",
  phone: string; // 255 char max / required",
  email: string; // 255 char max / required",
  address: string; // 255 char max / required",
  city: string; // 255 char max / required",
  state: string; // 255 char max / required",
  zip: string; // 255 char max / required",
  photo: string; // 255 char max / URL to image file",
  notes: string; // 4GB max"
};

type ProfileState = {
  profiles: Profile[];
  activeProfile: Profile | null;
  activeProfileStatus: 'viewing' | 'editing' | 'creating' | null
  profileFormError: string | null;
};

const makeFakeUserList = (): Profile[] => {
  return fakeUsers.map((user) => {
    const names = user.name.split(" ");
    const first_name = names.shift() as string;
    const last_name = names.join(" ");
    const profileFromUser: Profile = {
      id: user.id,
      first_name,
      last_name,
      phone: user.phone,
      email: user.email,
      photo: user.photo || "",
      address: [user.address.street, user.address.suite].join(" "),
      city: user.address.city,
      state: user.address.state,
      zip: user.address.zipcode,
      notes: user.website || "",
    };
    return profileFromUser;
  });
};

export { makeFakeUserList, type Profile, type ProfileState };
