import React, { useContext, useEffect, useState } from "react";
import { LoadingOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Input, message, Skeleton } from "antd";
import EmptyState from "../_components/EmptyState";
import AiChatServices from "../../../../../services/ai/ChatAi";
import { AuthContext } from "../../../../../contexts/AuthContext";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

export default function Home() {
  const { access_token, checkPermission } = useContext(AuthContext);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const { chatid } = useParams();
  const conSend = async () => {
    setLoading(true);
    setMessageList((pre) => [
      ...pre,
      {
        content: userInput,
        role: "user",
        type: "text ",
      },
    ]);
    setUserInput("");
    const doc = { userInput: userInput, role: "user", type: "text" };
    const result = await AiChatServices.userMessage({ access_token, doc });
    setMessageList((pre) => [...pre, result]);
    setLoading(false);
  };

  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48 mt-4">
      <div className="flex items-center justify-center gap-8">
        <div>
          <h2 className="font-bold text-lg">VTS Express Q/A Chat</h2>
          <p>
            Smarter chat decisions start here -- get tailored advice,real-time
            market insights
          </p>
        </div>
        <Button>+ New Chat</Button>
      </div>
      <div className="flex flex-col h-[65vh] mt-6">
        {messageList.length <= 0 && (
          <div>
            {/* Empty State Option */}
            <EmptyState
              selectedQuestion={(question) => setUserInput(question)}
            />
          </div>
        )}
        <div className="flex-1">
          {/* Message List */}
          {messageList?.map((message, index) => (
            <div>
              <div
                key={index}
                className={`flex mb-2 ${message.role == "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-lg gap-2 ${message.role == "user" ? "bg-gray-200 text-black  rounded-lg" : "bg-gray-50 text-black"}`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
              {loading && index === messageList?.length - 1 && (
                <div className="p-3 rounded-lg gap-2 bg-gray-50 text-black">
                  <Skeleton />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center gap-6">
          {/* Input Field */}
          <Input
            size="medium"
            type="text"
            placeholder="Type here"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <Button
            onClick={() => conSend()}
            disabled={loading}
          >
            <SendOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
}
