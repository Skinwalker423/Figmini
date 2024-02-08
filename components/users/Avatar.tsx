import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

/**
 * This file shows how to add live avatars like you can see them at the top right of a Google Doc or a Figma file.
 * https://liveblocks.io/docs/examples/live-avatars
 *
 * The users avatar and name are not set via the `useMyPresence` hook like the cursors.
 * They are set from the authentication endpoint.
 *
 * See pages/api/liveblocks-auth.ts and https://liveblocks.io/docs/api-reference/liveblocks-node#authorize for more information
 */

const IMAGE_SIZE = 48;

export function Avatar({
  src,
  name,
  otherStyles,
}: {
  src?: string;
  name: string;
  otherStyles: string;
}) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(
          Math.random() * 30
        )}.png`}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        className={`${styles.avatar_picture} ${otherStyles}`}
        alt={`avatar of ${name} w-9 h-9`}
      />
    </div>
  );
}
