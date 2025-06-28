import React from "react";
import CommentToOrgCard from "@/app/components/ui/general/comment-toOrg-card";

const CommentToOrgTestPage = () => {
  return (
    <div className="min-h-screen bg-neutral-mint-white flex flex-col items-center justify-center p-8">
      <CommentToOrgCard
        commenterName="Excel Duran"
        commenterAvatarSrc={null}
        daysSinceCommented={2}
        replyText={
          "xd ndashfoajfjfjpjdfljfojsopfjpajfpsajjpaoxd ndashfoajfjfjpjdfljfojsopfjpajfpsajjpaoxd ndashfoajfjfjpjdfljfojsopfjpajfpsajjpaoxd ndashfoajfjfjpjdfljfojsopfjpajfpsajjpao..........."
        }
        postTitle="POST TITLE"
        postOrg="ORG"
      />
    </div>
  );
};

export default CommentToOrgTestPage; 