import { useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useRequest } from "../../context/RequestContext";
import { useEffect, useState } from "react";
import "./details-request.css";
import { useMessage } from "../../context/MessageContext";
import { formatDateTime, formatTimeAgo } from "../../helpers/dateUtils";
import FloatingChatButton from "../../components/details/FloatingChatButton/FloatingChatButton";
import ContactSection from "../../components/details/ContactSection/ContactSection";
import ActionsSection from "../../components/details/ActionsSection/ActionsSection";
import IdentitySection from "../../components/details/IdentitySection/IdentitySection";
import Tag from "../../components/Tag/Tag";
import DetailsGridSection from "../../components/details/DetailsGridSection/DetailsGridSection";
import { getQuantityLabel } from "../../helpers/formatters";
import SectionWrapper from "../../components/details/SectionWrapper/SectionWrapper";
import NotFound from "../../components/common/NotFound/NotFound";

function DetailsRequest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requests, removeRequest, updateRequestStatus } = useRequest();
  const { openThread } = useMessage();

  const request = requests.find((r) => r._id === id);
  const [status, setStatus] = useState(request?.status);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [tempStatus, setTempStatus] = useState(status);

  useEffect(() => {
    if (request) {
      setStatus(request.status);
      setTempStatus(request.status);
    }
  }, [request]);

  if (!request) {
    return <NotFound text="הבקשה לא נמצאה" />;
  }

  const isOwner = user && user._id === request.requester?._id;
  const isUserAdmin = user?.role === "userAdmin";
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isUserAdmin || isAdmin;
  const canUseChat = !!request.requester?._id && !isOwner;

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    await updateRequestStatus(request._id, newStatus);
  };

  const handleDelete = async () => {
    await removeRequest(request._id);
    navigate("/requests");
  };

  const handleOpenChat = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!request.requester?._id) {
      console.error("Requester ID is missing:", request);
      return;
    }

    if (user._id === request.requester._id) {
      navigate("/messages");
      return;
    }

    try {
      const thread = await openThread({
        relatedType: "SupportRequest",
        relatedId: request._id,
        participants: [request.requester._id],
      });

      if (!thread?._id) {
        console.error("No valid thread returned:", thread);
        return;
      }

      const isNewThread = !thread.messages || thread.messages.length === 0;

      const initialText = isNewThread
        ? thread.relatedType === "SupportRequest"
          ? "היי, אני אשמח לעזור 🙂"
          : "היי, אשמח לסייע, איך אוכל לעזור? 🙂"
        : "";

      navigate(`/messages/${thread._id}`, { state: { initialText } });
    } catch (err) {
      console.error("Failed to open chat:", err);
    }
  };

  const detailsItems = [
    {
      icon: "bi-people",
      label: "עבור",
      value: getQuantityLabel(request.requiredQuantity),
    },
    {
      icon: "bi-geo-alt",
      label: "עיר",
      value: request.city || "לא צוין",
    },
    {
      icon: "bi-map",
      label: "אזור",
      value: request.region || "לא צוין",
    },
    {
      icon: "bi-clock",
      label: "זמין עד",
      value: request.deadline ? formatTimeAgo(request.deadline) : "לא צוין",
      title: request.deadline ? formatDateTime(request.deadline) : "",
    },
    {
      icon: "bi-pencil-square",
      label: "עודכן לאחרונה",
      value: request.updatedAt ? formatTimeAgo(request.updatedAt) : "לא צוין",
      title: request.updatedAt ? formatDateTime(request.updatedAt) : "",
    },
    {
      icon: "bi-calendar-plus",
      label: "תאריך פרסום",
      value: request.createdAt ? formatTimeAgo(request.createdAt) : "לא צוין",
      title: request.createdAt ? formatDateTime(request.createdAt) : "",
    },
  ];

  return (
    <div className="details-request-page">
      <div className="details-request-header">
        <ActionsSection
          canManage={canManage}
          isEditingStatus={isEditingStatus}
          tempStatus={tempStatus}
          statusOptions={["פתוחה", "בטיפול", "הושלמה"]}
          onStartEdit={() => setIsEditingStatus(true)}
          onTempStatusChange={setTempStatus}
          onSave={async () => {
            await handleStatusChange(tempStatus);
            setIsEditingStatus(false);
          }}
          onCancel={() => {
            setTempStatus(status);
            setIsEditingStatus(false);
          }}
          onEdit={() => navigate(`/edit-request/${request._id}`)}
          onDelete={handleDelete}
        />

        <IdentitySection
          title={request.title}
          authorName={request.requester?.fullName}
          isOwner={isOwner}
        />

        <div className="tags-row">
          <Tag type="status" value={request.status} label="סטטוס" size="md" />
          <Tag
            type="category"
            value={request.category}
            label="קטגוריה"
            size="md"
          />
          <Tag
            type="priority"
            value={request.priority}
            label="דחיפות"
            size="md"
          />
        </div>
      </div>

      <SectionWrapper icon="bi-card-text" title="תיאור הבקשה">
        <p className="description">
          {request.description || "לא הוזן תיאור לבקשה"}
        </p>
      </SectionWrapper>

      <SectionWrapper icon="bi-info-circle" title="פרטים נוספים">
        <DetailsGridSection type="request" items={detailsItems} />
      </SectionWrapper>

      <SectionWrapper icon="bi-person-lines-fill" title="יצירת קשר">
        <ContactSection
          type="request"
          phone={request.contactPhone}
          email={request.contactEmail}
          hasUser={!!request.requester?._id}
          canUseChat={canUseChat}
          onChatClick={handleOpenChat}
        />
      </SectionWrapper>

      <FloatingChatButton
        visible={canUseChat}
        onClick={handleOpenChat}
        title="שליחת הודעה למפרסם הבקשה"
      />
    </div>
  );
}

export default DetailsRequest;
