import ViewKycDocPage from '@modules/admin/page/ViewKycDocsPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/view-kyc/$kycId')({
  // validateSearch: (search) => {
  //   return {
  //     kycId: search.kycId as string,
  //   }
  // },
  component: ViewKycDocPage
})

