import Image from 'next/image';
import { ICarHeader } from '@/types/typs';

export function CarHeader({ makeId, year }: ICarHeader) {
  return (
    <>
      <Image
        className="dark:invert"
        src="/img-2.webp"
        alt="car picture"
        width={300}
        height={150}
        priority
      />

      <div className="flex gap-8 border-2 p-2 rounded-xl items-center hover:bg-amber-50">
        <h1 className="text-xl ">Results for:</h1>
        <p>
          <strong>Make ID:</strong> {makeId}
        </p>
        <p>
          <strong>Year:</strong> {year}
        </p>
      </div>
    </>
  );
}
