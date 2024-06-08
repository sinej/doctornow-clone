'use client'

import React from 'react';
import TodoListItem from "@/components/ui/TodoListItem";
import {IoShareSocialOutline} from "react-icons/io5";
import {useCopyToClipboard} from "usehooks-ts";
import InputBox from "@/components/ui/InputBox";

const TodoList = ({
                    sharedUserFullName = "",
                    owerUserId = "",
                    loading = false,
                    todoListData = [],
                    isReadOnly = false,
                    onUpdate = (id, updateContent) => {},
                    onCreate = () => {},
                    onDelete = (id) => {},
                    onSearch = (terms) => {},
                  }) => {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const shareLink = `${"url"}/share/${owerUserId}`;

    copy(shareLink)
      .then(() => {
        window.alert(`공유링크 복사완료! \n ${shareLink}`);
      })
      .catch(error => {
        console.error("Failed To Copy!", error);
      })
  }

  return (
    <section className="min-h-[70vh] bg-white">
      <div className="w-full max-w-[800px] p-5 mx-auto">
        <article className="flex flex-row w-full justify-between">
          <div>
            {sharedUserFullName && <p className="font-bold text-3xl">{sharedUserFullName}</p>}
            <h1 className="font-bold text-4xl">Todo List</h1>
          </div>
          {owerUserId &&
            <div onClick={() => handleCopy()}>
              <IoShareSocialOutline/>
            </div>
          }
        </article>
        <div className="flex flex-col divide-y divide-neutral-400">
          {!isReadOnly &&
            <InputBox onCreate={onCreate}
                      onSearch={onSearch}
            />
          }
          {
            todoListData?.length >= 1 ? (
              <ul className="gap-5 flex flex-col">
                {(todoListData ?? []).map((todo) =>
                  <TodoListItem key={todo?.id}
                                {...todo}
                                onDelete={() => {}}
                                onUpdate={onUpdate}
                  />
                )}
              </ul>
            ) : (
              loading ? "Loading..." : "Empty!"
            )
          }
        </div>
      </div>
    </section>
  );
};

export default TodoList;