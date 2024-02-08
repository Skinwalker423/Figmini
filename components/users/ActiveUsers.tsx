import { Avatar } from "./Avatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import styles from "./ActiveUsers.module.css";
import { generateRandomName } from "@/lib/utils";
import { useMemo } from "react";

export function ActiveUsers() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  const memoizedUsers = useMemo(() => {
    return (
      <div className='flex items-center justify-center gap-1'>
        <div className='flex pl-3'>
          {currentUser && (
            <div className='relative ml-8 first:ml-0'>
              <Avatar
                otherStyles='border-[3px] border-primary-green'
                name='You'
              />
            </div>
          )}
          {users
            .slice(0, 3)
            .map(
              ({
                connectionId,
                info,
              }: {
                connectionId: number;
                info: any;
              }) => {
                return (
                  <Avatar
                    key={connectionId}
                    otherStyles='-ml-3'
                    name={generateRandomName()}
                  />
                );
              }
            )}

          {hasMoreUsers && (
            <div className={styles.more}>
              +{users.length - 3}
            </div>
          )}
        </div>
      </div>
    );
  }, [users.length]);
  return memoizedUsers;
}
