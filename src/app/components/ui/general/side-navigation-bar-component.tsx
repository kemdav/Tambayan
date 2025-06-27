import { ButtonList } from "@/app/components/ui/general/button-list";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import {
  AddIcon,
  NewsfeedIcon,
  StudentProfileIcon,
  SubscribedOrgIcon,
  UserPofileLoginIcon,
} from "@/app/components/icons";

export default function SideNavBar() {
  const myButtons: ButtonConfig[] = [
    {
      id: "save-btn",
      children: "Student Profile",
      className:
        "h-10 justify-start bg-tint-forest-fern transition delay-150 duration-5000 ease-in-out hover:translate-200 hover:bg-neutral-deep-forst-green text-neutral-pure-white",
      icon: <UserPofileLoginIcon className="bg-action-light-blue" />,
    },
    {
      id: "cancel-btn",
      children: "Newsfeed",
      className:
        "button-secondary justify-start bg-tint-forest-fern hover:bg-primary-forest-green text-neutral-pure-white",
      icon: <UserPofileLoginIcon className="bg-action-light-blue" />,
    },
    {
      id: "delete-btn",
      children: "Subscribed Organizations",
      className:
        "button-danger justify-start bg-tint-forest-fern text-neutral-pure-white",
      icon: <UserPofileLoginIcon className="bg-action-light-blue" />,
    },
    {
      id: "disabled-btn",
      children: "Join Organization",
      className: "justify-start bg-tint-forest-fern text-neutral-pure-white",
      icon: <UserPofileLoginIcon className="bg-action-light-blue" />,
    },
  ];

  return (
    <main className="bg-tint-forest-fern w-60 h-screen">
      <div>
        <h1>Heading</h1>
      </div>

      <div>
        <ButtonList buttons={myButtons} className="flex flex-col" />
      </div>
    </main>
  );
}
