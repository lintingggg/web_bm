import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Image as ImageIcon,
    Pencil,
    Plus,
    Search,
    Trash2,
    XCircle,
    LayoutDashboard,
} from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

const defaultData = {
    title: '',
    subtitle: '',
    image: null,
    is_active: true,
    sort_order: 0,
};

function ErrorText({ message }) {
    if (!message) return null;
    return <p className="text-xs text-rose-500">{message}</p>;
}

export default function HeroSectionsIndex({ heroSections, stats }) {
    const [editingItem, setEditingItem] = useState(null);
    const form = useForm(defaultData);

    const submit = (event) => {
        event.preventDefault();

        if (editingItem) {
            form.transform((data) => {
                const formData = { ...data, _method: 'put' };
                if (formData.image === null) {
                    delete formData.image;
                }
                formData.is_active = formData.is_active ? 1 : 0;
                return formData;
            });
            form.post(route('hero-sections.update', editingItem.id), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    form.reset();
                    form.setData('is_active', true);
                    form.setData('sort_order', 0);
                    setEditingItem(null);
                },
            });
            return;
        }

        form.transform((data) => {
            const formData = { ...data };
            formData.is_active = formData.is_active ? 1 : 0;
            return formData;
        });
        form.post(route('hero-sections.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                form.reset();
                form.setData('is_active', true);
                form.setData('sort_order', 0);
            },
        });
    };

    const editItem = (item) => {
        setEditingItem(item);
        form.setData({
            title: item.title || '',
            subtitle: item.subtitle || '',
            image: null,
            is_active: item.is_active,
            sort_order: item.sort_order,
        });
        form.clearErrors();
    };

    const deleteItem = (item) => {
        Swal.fire({
            title: 'Hapus Banner?',
            text: `Anda yakin ingin menghapus banner ini?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#e5e7eb',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('hero-sections.destroy', item.id), {
                    preserveScroll: true,
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold leading-tight text-neutral-800 dark:text-neutral-200">
                            Manajemen Hero Section
                        </h2>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            Kelola gambar banner di halaman utama.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Hero Sections" />

            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {/* Stats */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <ImageIcon size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                    Total Banner
                                </p>
                                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                    {stats.total}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <LayoutDashboard size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                    Aktif
                                </p>
                                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                    {stats.active}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                        <div className="flex items-center gap-4">
                            <div className="rounded-lg bg-rose-50 p-3 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400">
                                <XCircle size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                    Tidak Aktif
                                </p>
                                <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                    {stats.inactive}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Form Component */}
                    <div className="lg:col-span-1">
                        <form
                            onSubmit={submit}
                            className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-surface-base"
                        >
                            <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                    {editingItem ? 'Edit Banner' : 'Tambah Banner Baru'}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-4 p-6">
                                {/* Title Field (Optional) */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Judul (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.title}
                                        onChange={(e) => form.setData('title', e.target.value)}
                                        className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                        placeholder="Judul Banner"
                                    />
                                    <ErrorText message={form.errors.title} />
                                </div>
                                
                                {/* Subtitle Field (Optional) */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Subjudul (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        value={form.data.subtitle}
                                        onChange={(e) => form.setData('subtitle', e.target.value)}
                                        className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                        placeholder="Subjudul Banner"
                                    />
                                    <ErrorText message={form.errors.subtitle} />
                                </div>

                                {/* Image Field */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Gambar Banner {editingItem && '(Kosongkan jika tidak diubah)'}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => form.setData('image', e.target.files[0])}
                                        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-700 file:mr-4 file:rounded-md file:border-0 file:bg-neutral-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-neutral-200 focus:border-accent-orange focus:outline-none focus:ring-1 focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-neutral-300 dark:file:bg-neutral-800 dark:file:text-neutral-300 hover:dark:file:bg-neutral-700"
                                    />
                                    <ErrorText message={form.errors.image} />
                                    {editingItem?.image_url && (
                                        <div className="mt-2">
                                            <p className="mb-1 text-xs text-neutral-500">Gambar Saat Ini:</p>
                                            <img src={editingItem.image_url} alt="Current" className="h-20 w-auto rounded border" />
                                        </div>
                                    )}
                                </div>

                                {/* Sort Order Field */}
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Urutan (Sort Order)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.data.sort_order}
                                        onChange={(e) => form.setData('sort_order', parseInt(e.target.value))}
                                        className="w-full rounded-lg border-neutral-300 bg-white text-sm focus:border-accent-orange focus:ring-accent-orange dark:border-neutral-700 dark:bg-surface-muted dark:text-white"
                                    />
                                    <ErrorText message={form.errors.sort_order} />
                                </div>

                                {/* Status Toggle */}
                                <label className="flex items-center gap-3">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={form.data.is_active}
                                            onChange={(e) => form.setData('is_active', e.target.checked)}
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-neutral-300 bg-white transition-colors checked:border-accent-orange checked:bg-accent-orange focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 dark:border-neutral-600 dark:bg-surface-muted dark:checked:border-accent-orange dark:checked:bg-accent-orange dark:focus:ring-offset-surface-base"
                                        />
                                        <svg
                                            className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Aktifkan Banner
                                    </span>
                                </label>
                            </div>

                            <div className="flex items-center gap-3 border-t border-neutral-200 bg-neutral-50 px-6 py-4 dark:border-neutral-800 dark:bg-surface-base/50">
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="flex items-center gap-2 rounded-lg bg-accent-orange px-4 py-2 text-sm font-medium text-white hover:bg-accent-orange/90 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {editingItem ? <Pencil size={16} /> : <Plus size={16} />}
                                    {editingItem ? 'Simpan Perubahan' : 'Tambah Banner'}
                                </button>
                                {editingItem && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingItem(null);
                                            form.reset();
                                            form.clearErrors();
                                        }}
                                        className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 dark:border-neutral-700 dark:bg-surface-muted dark:text-neutral-300 dark:hover:bg-neutral-800"
                                    >
                                        Batal
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-surface-base">
                            <div className="border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
                                    Daftar Banner
                                </h3>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                                    <thead className="bg-neutral-50 dark:bg-surface-muted">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                Gambar
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                Informasi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                Status / Urutan
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-800 dark:bg-surface-base">
                                        {heroSections.data.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
                                                    Belum ada data banner.
                                                </td>
                                            </tr>
                                        ) : (
                                            heroSections.data.map((item) => (
                                                <tr key={item.id} className="hover:bg-neutral-50 dark:hover:bg-surface-muted/50">
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {item.image_url ? (
                                                            <div className="h-16 w-32 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                                                <img
                                                                    src={item.image_url}
                                                                    alt="Banner"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                                                                <ImageIcon className="h-6 w-6 text-neutral-400" />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                            {item.title || <span className="text-neutral-400 italic">Tanpa Judul</span>}
                                                        </div>
                                                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                                            {item.subtitle || '-'}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                item.is_active
                                                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                                    : 'bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400'
                                                            }`}
                                                        >
                                                            {item.is_active ? 'Aktif' : 'Tidak Aktif'}
                                                        </span>
                                                        <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                            Urutan: {item.sort_order}
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => editItem(item)}
                                                                className="rounded-lg p-2 text-amber-600 hover:bg-amber-50 dark:text-amber-500 dark:hover:bg-amber-500/10 transition-colors"
                                                                title="Edit"
                                                            >
                                                                <Pencil size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => deleteItem(item)}
                                                                className="rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-500 dark:hover:bg-rose-500/10 transition-colors"
                                                                title="Hapus"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination Component if needed */}
                            {heroSections.links && heroSections.links.length > 3 && (
                                <div className="border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {heroSections.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`rounded-lg px-3 py-1 text-sm ${
                                                    link.active
                                                        ? 'bg-accent-orange text-white'
                                                        : link.url
                                                        ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-surface-muted dark:text-neutral-300 dark:hover:bg-neutral-700'
                                                        : 'bg-neutral-50 text-neutral-400 cursor-not-allowed dark:bg-surface-base dark:text-neutral-600'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
