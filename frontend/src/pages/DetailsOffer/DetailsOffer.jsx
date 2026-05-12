import { useLocation, useNavigate, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { useOffer } from "../../context/OfferContext";
import { useMessage } from "../../context/MessageContext";
import { useEffect, useState } from "react";
import "./details-offer.css";
import { formatDateTime, formatTimeAgo } from "../../helpers/dateUtils";
import { getQuantityLabel } from "../../helpers/formatters";
import ActionsSection from "../../components/details/ActionsSection/ActionsSection";
import NotFound from "../../components/common/NotFound/NotFound";
import IdentitySection from "../../components/details/IdentitySection/IdentitySection";
import Tag from "../../components/Tag/Tag";
import SectionWrapper from "../../components/details/SectionWrapper/SectionWrapper";
import DetailsGridSection from "../../components/details/DetailsGridSection/DetailsGridSection";
import ContactSection from "../../components/details/ContactSection/ContactSection";
import FloatingChatButton from "../../components/details/FloatingChatButton/FloatingChatButton";

function DetailsOffer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuth();
  const { offers, updateOfferStatus, removeOffer } = useOffer();
  const { openThread } = useMessage();

  const offer = offers.find((o) => o._id === id);
  const [status, setStatus] = useState(offer?.status);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [tempStatus, setTempStatus] = useState(status);

  useEffect(() => {
    if (offer) {
      setStatus(offer.status);
      setTempStatus(offer.status);
    }
  }, [offer]);

  if (!offer) {
    return <NotFound message="התרומה לא נמצאה" />;
  }

  const isOwner = user && user._id === offer.supporter?._id;
  const isUserAdmin = user?.role === "userAdmin";
  const isAdmin = user?.role === "admin";
  const canManage = isOwner || isUserAdmin || isAdmin;
  const canUseChat = !!offer.supporter?._id && !isOwner;

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    await updateOfferStatus(offer._id, newStatus);
  };

  const handleDelete = async () => {
    await removeOffer(offer._id);
    navigate("/offers");
  };

  const handleOpenChat = async () => {
    if (!user) {
      navigate("/sign-in", {
        state: {
          openChatAfterLogin: true,
          relatedType: "SupportOffer",
          relatedId: offer._id,
          participantId: offer.supporter._id,
          from: location.pathname || window.location.pathname,
        },
      });

      return;
    }

    if (!offer.supporter?._id) {
      console.error("Supporter ID is missing:", offer);
      return;
    }

    if (user._id === offer.supporter._id) {
      navigate("/messages");
      return;
    }

    try {
      const thread = await openThread({
        relatedType: "SupportOffer",
        relatedId: offer._id,
        participants: [offer.supporter._id],
      });

      if (!thread?._id) {
        console.error("No valid thread returned:", thread);
        return;
      }

      const isNewThread = !thread.messages || thread.messages.length === 0;

      const initialText = isNewThread ? "היי, התרומה עדיין זמינה? 🙂" : "";

      navigate(`/messages/${thread._id}`, {
        state: { initialText },
      });
    } catch (err) {
      console.error("Failed to open chat:", err);
    }
  };

  const detailsItems = [
    {
      icon: "bi-box-seam",
      label: "כמות זמינה",
      value: getQuantityLabel(offer.availableQuantity),
    },
    {
      icon: "bi-geo-alt",
      label: "עיר",
      value: offer.city || "לא צוין",
    },
    {
      icon: "bi-map",
      label: "אזור",
      value: offer.region || "לא צוין",
    },
    {
      icon: "bi-clock",
      label: "זמין עד",
      value: offer.availableUntil
        ? formatTimeAgo(offer.availableUntil)
        : "לא צוין",
      title: offer.availableUntil ? formatDateTime(offer.availableUntil) : "",
    },
    {
      icon: "bi-pencil-square",
      label: "עודכן לאחרונה",
      value: offer.updatedAt ? formatTimeAgo(offer.updatedAt) : "לא צוין",
      title: offer.updatedAt ? formatDateTime(offer.updatedAt) : "",
    },
    {
      icon: "bi-calendar-plus",
      label: "תאריך פרסום",
      value: offer.createdAt ? formatTimeAgo(offer.createdAt) : "לא צוין",
      title: offer.createdAt ? formatDateTime(offer.createdAt) : "",
    },
  ];

  return (
    <div className="details-offer-page">
      <div className="details-offer-header">
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
          onEdit={() => navigate(`/edit-offer/${offer._id}`)}
          onDelete={handleDelete}
        />

        <IdentitySection
          title={offer.title}
          authorName={offer.supporter?.fullName}
          isOwner={isOwner}
        />

        <div className="tags-row">
          <Tag type="status" value={offer.status} label="סטטוס" size="md" />

          <Tag
            type="category"
            value={offer.category}
            label="קטגוריה"
            size="md"
          />
        </div>
      </div>

      <SectionWrapper icon="bi-card-text" title="תיאור התרומה">
        <p className="description">
          {offer.description || "לא הוזן תיאור לתרומה"}
        </p>
      </SectionWrapper>

      <SectionWrapper icon="bi-info-circle" title="פרטים נוספים">
        <DetailsGridSection type="offer" items={detailsItems} />
      </SectionWrapper>

      <SectionWrapper icon="bi-person-lines-fill" title="יצירת קשר">
        <ContactSection
          type="offer"
          phone={offer.contactPhone}
          email={offer.contactEmail}
          hasUser={!!offer.supporter?._id}
          canUseChat={canUseChat}
          onChatClick={handleOpenChat}
        />
      </SectionWrapper>

      <FloatingChatButton
        visible={canUseChat}
        onClick={handleOpenChat}
        title="שליחת הודעה למפרסם התרומה"
      />
    </div>
  );
}

export default DetailsOffer;
