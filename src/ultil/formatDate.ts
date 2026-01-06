export const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("vi-VN");

export const formatTimeAMPM = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};
