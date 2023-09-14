import { Patent } from '@/models/patent';
import { getPatentId, groupPatentsByFamily } from '@/utils/patents';
import { PatentsInFamilyLink } from '@/app/package/[id]/components/package-patents/components/patents-in-family-link';
import { Fragment } from 'react';

interface PackagePatentsTableCompactProps {
  patents: Patent[];
}

export const PackagePatentsTableCompact = ({ patents }: PackagePatentsTableCompactProps) => {
  const familyPatents = groupPatentsByFamily(patents);
  const patentsGroups = Object.values(familyPatents);
  return (
    <div>
      <div className="hidden md:block">
        <div className="grid grid-cols-4">
          <div className="col-span-2">Title</div>
          <div>Publication/Patent no.</div>
          <div>Filling date</div>
          {patentsGroups.map(patents => {
            const patent = patents[0];
            const patentId = getPatentId(patent);
            return (
              <Fragment key={patentId}>
                <div className="col-span-2">
                  <div>
                    <div className="mb-[17px]">{patent.title}</div>
                    <PatentsInFamilyLink totalPatents={patents.length} />
                  </div>
                </div>
                <div>{patentId}</div>
                <div>{patent.applicationDate}</div>
              </Fragment>
            );
          })}
        </div>
      </div>

      <div className="md:hidden">
        {patentsGroups.map((patents, index) => {
          const patent = patents[0];
          const patentId = getPatentId(patent);
          return (
            <div key={patentId}>
              <div className="grid grid-rows-3 grid-col-2">
                <div className="col-span-2">Family {index + 1}</div>
                <div className="col-span-2">{patent.title}</div>
                <div>
                  <div>Pub/Patent no.</div>
                  <div>{patentId}</div>
                </div>
                <div>
                  <div>Filling date</div>
                  <div>{patent.applicationDate}</div>
                </div>
              </div>
              <PatentsInFamilyLink totalPatents={patents.length} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
