import { ReactComponent as Logo } from '../../images/logo.svg'
import ToggleMode from './toggle-mode/ToggleMode'
import styled from 'styled-components'
import cx from 'classnames'
import NewDocument from './new-document/NewDocument'
import DocListing from './doc-listing/DocListing'

const SidebarDiv = styled.div``
const MyDocuments = styled.div``

const Sidebar = (props: { openNav: boolean; toggleOpenNav: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <SidebarDiv
            className={cx(
                'sidebar bg-neutral-1000 text-neutral-100 items-start flex flex-col min-h-full justify-start px-6 py-7 fixed -left-[250px] w-[250px] z-0',
                { ['open left-0 ']: props.openNav },
            )}
            id="sidenav"
        >
            <Logo title="logo" className="lg:hidden mb-7" />

            <MyDocuments
                className={
                    'my-documents text-neutral-500 font-sans text-sm leading-4 tracking-[.125rem] uppercase mb-7'
                }
            >
                My Documents
            </MyDocuments>

            <NewDocument />
            <DocListing />
            {/* {documents && docListing()} */}

            <ToggleMode />
        </SidebarDiv>
    )
}

export default Sidebar
