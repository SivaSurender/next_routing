import Messages from "@/components/messages";

export default async function MessagesPage() {
  const response = await fetch("http://localhost:8080/messages", {
    // force-cache default for nextjs
    // default for next 15 - no-store
    // cache: "no-store",
    next: {
      // 5 seconds
      revalidate: 5,
    },
  });
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
