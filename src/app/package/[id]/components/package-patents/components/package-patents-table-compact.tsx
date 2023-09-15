import { Patent } from '@/models/patent';
import { getPatentId, groupPatentsByFamily } from '@/utils/patents';
import { PatentsInFamilyLink } from '@/app/package/[id]/components/package-patents/components/patents-in-family-link';
import { Fragment } from 'react';
import { TableHeaderTitle } from '@/app/package/[id]/components/package-patents/components/table-header-title';
import { PackageTableApplicationDate } from '@/app/package/[id]/components/package-patents/components/package-table-application-date';
import { PackageTablePatentId } from '@/app/package/[id]/components/package-patents/components/package-table-patent-id';
import { PackageTableTitle } from '@/app/package/[id]/components/package-patents/components/package-table-title';

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
          <div className="col-span-2">
            <TableHeaderTitle title="Title" />
          </div>
          <div>
            <TableHeaderTitle title="Publication/Patent no." />
          </div>
          <div>
            <TableHeaderTitle title="Filling date" />
          </div>
          {patentsGroups.map(patents => {
            const patent = patents[0];
            const patentId = getPatentId(patent);
            return (
              <Fragment key={patentId}>
                <div className="col-span-2">
                  <div>
                    <div className="mb-[17px]">
                      <PackageTableTitle title={patent.title} />
                    </div>
                    <PatentsInFamilyLink totalPatents={patents.length} />
                  </div>
                </div>
                <div>
                  <PackageTablePatentId patentId={patentId} />
                </div>
                <div>
                  <PackageTableApplicationDate gmtDate={patent.applicationDate} />
                </div>
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
                <div className="col-span-2">
                  <TableHeaderTitle title={`Family ${index + 1}`} />
                </div>
                <div className="col-span-2">
                  <PackageTableTitle title={patent.title} />
                </div>
                <div>
                  <div>
                    <TableHeaderTitle title="Pub/Patent no." classNames="!text-[11px]" />
                  </div>
                  <div>
                    <PackageTablePatentId patentId={patentId} />
                  </div>
                </div>
                <div>
                  <div>
                    <TableHeaderTitle title="Filling date" classNames="!text-[11px]" />
                  </div>
                  <div>
                    <PackageTableApplicationDate gmtDate={patent.applicationDate} />
                  </div>
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
