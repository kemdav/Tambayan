// import * as React from "react";
// import { CreatePostComponent } from "./create-post-component";
// import { DisplayPostComponent } from "./display-post-component";

// interface CreateDisplayPostCombinedProps {
//   onPostSuccess?: () => void;
//   className?: string;
// }

// export const CreateDisplayPostCombined: React.FC<
//   CreateDisplayPostCombinedProps
// > = ({ onPostSuccess, className }) => {
//   const [postType, setPostType] = React.useState("default");
//   const [org, setOrg] = React.useState<string | null>(null);
//   const [title, setTitle] = React.useState("");
//   const [content, setContent] = React.useState("");
//   const [eventLocation, setEventLocation] = React.useState("");
//   const [eventDate, setEventDate] = React.useState("");
//   const [registrationStart, setRegistrationStart] = React.useState<
//     Date | undefined
//   >();
//   const [registrationEnd, setRegistrationEnd] = React.useState<
//     Date | undefined
//   >();
//   const [photoFile, setPhotoFile] = React.useState<File | null>(null);
//   const [tags, setTags] = React.useState<string[]>([]);
//   const [tagInput, setTagInput] = React.useState("");
//   const [displayData, setDisplayData] = React.useState<any>(null);

//   // Tag handlers
//   const handleAddTag = () => {
//     const trimmed = tagInput.trim();
//     if (trimmed && !tags.includes(trimmed)) {
//       setTags([...tags, trimmed]);
//     }
//     setTagInput("");
//   };
//   const handleRemoveTag = (tag: string) => {
//     setTags(tags.filter((t) => t !== tag));
//   };

//   const handlePost = () => {
//     const data = {
//       posterName: "Unknown",
//       recipient: postType === "default" ? org || undefined : undefined,
//       avatarSrc: null,
//       daysSincePosted: 0,
//       title,
//       content,
//       imageSrc: photoFile ? URL.createObjectURL(photoFile) : undefined,
//       likes: 0,
//       comments: 0,
//       tags,
//       event: postType === "event" ? title : undefined,
//       eventLocation: postType === "event" ? eventLocation : undefined,
//       eventDate: postType === "event" ? eventDate : undefined,
//       registrationPeriod:
//         postType === "event" && registrationStart && registrationEnd
//           ? `${registrationStart.toLocaleString()} - ${registrationEnd.toLocaleString()}`
//           : undefined,
//       isDetailed: postType === "event",
//     };
//     setDisplayData(data);
//     if (onPostSuccess) onPostSuccess();
//   };

//   return (
//     <div className={className}>
//       {!displayData ? (
//         <CreatePostComponent
//           className="w-full"
//           postType={postType}
//           onPostTypeChange={setPostType}
//           org={org}
//           onOrgChange={setOrg}
//           title={title}
//           onTitleChange={setTitle}
//           content={content}
//           onContentChange={setContent}
//           onPost={handlePost}
//           eventLocation={eventLocation}
//           onEventLocationChange={setEventLocation}
//           eventDate={eventDate}
//           onEventDateChange={setEventDate}
//           registrationStart={registrationStart}
//           onRegistrationStartChange={setRegistrationStart}
//           registrationEnd={registrationEnd}
//           onRegistrationEndChange={setRegistrationEnd}
//           photoFile={photoFile}
//           onPhotoChange={setPhotoFile}
//           tags={tags}
//           tagInput={tagInput}
//           onTagInputChange={setTagInput}
//           onAddTag={handleAddTag}
//           onRemoveTag={handleRemoveTag}
//         />
//       ) : (
//         <DisplayPostComponent {...displayData} />
//       )}
//     </div>
//   );
// };
