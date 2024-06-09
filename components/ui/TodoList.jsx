'use client'

import React from 'react';
import TodoListItem from "@/components/ui/TodoListItem";
import {IoShareSocialOutline} from "react-icons/io5";
import {useCopyToClipboard} from "usehooks-ts";
import InputBox from "@/components/ui/InputBox";
import TodoListItemReadonly from "@/components/ui/TodoListItemReadonly";

const TodoList = ({
                    sharedUserFullName = "",
                    ownerUserId = "",
                    loading = false,
                    todoListData = [],
                    isReadOnly = false,
                    onUpdate = (id, updateContent) => {
                    },
                    onCreate = () => {
                    },
                    onDelete = (id) => {
                    },
                    onSearch = (terms) => {
                    },
                  }) => {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = () => {
    const shareLink = `${process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME}share/${ownerUserId}`;

    copy(shareLink)
      .then(() => {
        window.alert(`공유링크 복사완료! \n ${shareLink}`);
      })
      .catch(error => {
        console.error("Failed To Copy!", error);
      })
  }

  console.log("ownerUserId", ownerUserId)

  return (
    <section className="min-h-[70vh] bg-white">
      <div className="w-full max-w-[800px] p-5 mx-auto">
        <article className="flex flex-row w-full justify-between">
          <div>
            {sharedUserFullName && <p className="font-bold text-3xl">{sharedUserFullName}</p>}
            <h1 className="font-bold text-4xl">Todo List</h1>
          </div>
          {ownerUserId &&
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
                {(todoListData ?? []).map((todo) => {
                  if (isReadOnly) {
                    return <TodoListItemReadonly key={todo?.id}
                                                 content={todo?.content}
                    />
                  }
                  return (
                    <TodoListItem key={todo?.id}
                                  {...todo}
                                  onDelete={onDelete}
                                  onUpdate={onUpdate}
                    />
                  )
                })}
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